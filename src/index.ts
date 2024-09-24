import { config } from "./config/config";
import { ensureOutputFolder, processFile } from "./utils/fileUtils";
import {
  LowerCaseStrategy,
  ReverseTextStrategy,
  UpperCaseStrategy,
  RemoveStringStrategy,
} from "./strategies";

const strategies = [
  [new RemoveStringStrategy(["foo", "WORLD"])],
  [new UpperCaseStrategy()],
  [new LowerCaseStrategy(), new ReverseTextStrategy()],
];

async function main(): Promise<void> {
  try {
    await ensureOutputFolder(config.outputFolder);

    const { inputFiles } = config;
    for (let i = 0; i < inputFiles.length; i++) {
      await processFile(
        inputFiles[i],
        strategies[i],
        config.inputFolder,
        config.outputFolder
      );
    }
  } catch (error) {
    console.error(
      "An error occurred during file processing:",
      (error as Error).message
    );
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  console.error("Unhandled error:", (error as Error).message);
  process.exit(1);
});
