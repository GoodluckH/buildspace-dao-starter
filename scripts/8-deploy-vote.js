import sdk from "./1-initialize-sdk.js";

// Grab the app module address.
const appModule = sdk.getAppModule(
  "0xb5761981563b1f1fe8fb37a2070dce3081437572"
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      // Give your governance contract a name.
      name: "mealq App Feature Proposals",

      // This is the location of our governance token, our ERC-20 contract!
      votingTokenAddress: "0x71F888421EbAd19ab1283dA6E6a4e7cbbc9a8C78",

      // After a proposal is created, when can members start voting?
      // For now, we set this to immediately.
      proposalStartWaitTimeInSeconds: 0,

      // Give people 3 days to vote
      proposalVotingTimeInSeconds: 24 * 60 * 60 * 3,

      // Will explain more below.
      votingQuorumFraction: 0,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      // I set it to 0. Meaning no tokens are required for a user to be allowed to
      // create a proposal.
      minimumNumberOfTokensNeededToPropose: "5",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address
    );
  } catch (err) {
    console.error("Failed to deploy vote module", err);
  }
})();
