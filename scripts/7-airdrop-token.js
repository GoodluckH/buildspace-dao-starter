import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
  "0xBc9A0Cba138E1b6E691570A16ae550fCc2F0F06C"
);

// This is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
  "0x71F888421EbAd19ab1283dA6E6a4e7cbbc9a8C78"
);

(async () => {
  try {
    // Grab all the addresses of people who own our membership NFT, which has
    // a tokenId of 0.
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      const genesisAmount = 5;
      console.log("✅ Going to airdrop", genesisAmount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        address,
        amount: ethers.utils.parseUnits(genesisAmount.toString(), 18),
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    await tokenModule.transferBatch(airdropTargets);
    console.log(
      "✅ Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
