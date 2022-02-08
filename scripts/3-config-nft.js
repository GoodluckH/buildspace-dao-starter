import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xBc9A0Cba138E1b6E691570A16ae550fCc2F0F06C"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "New York Dollar Pizza Slice",
        description: "This slice of pizza gives you access to mealqDAO!",
        image: readFileSync("scripts/assets/pizza-token.gif"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
