import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

const token = sdk.getTokenModule("0x71F888421EbAd19ab1283dA6E6a4e7cbbc9a8C78");

(async () => {
  try {
    const amountToBurn = 1_000;
    const amountWith18Decimals = ethers.utils.parseUnits(
      amountToBurn.toString(),
      18
    );
    await token.burn(amountWith18Decimals);
    console.log("burned %s $SLICE", amountToBurn);
  } catch (error) {
    console.log("error burning tokens, ", error);
  }
})();
