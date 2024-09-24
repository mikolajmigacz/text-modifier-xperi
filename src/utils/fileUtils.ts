import fs from "fs/promises";
import path from "path";
import { TextModifier } from "../services/text/TextModifier";
import {
  FileReadError,
  FileWriteError,
  StrategyExecutionError,
} from "../errors";
import { ITextModificationStrategy } from "../interfaces";

export async function ensureOutputFolder(outputFolder: string): Promise<void> {
  try {
    await fs.mkdir(outputFolder, { recursive: true });
  } catch (error) {
    console.error("Failed to create output folder:", (error as Error).message);
    throw error;
  }
}

export async function processFile(
  inputFile: string,
  strategy: Array<ITextModificationStrategy>,
  inputFolder: string,
  outputFolder: string
): Promise<void> {
  const inputFilePath: string = path.join(inputFolder, inputFile);
  const outputFilePath: string = path.join(
    outputFolder,
    `modified_${inputFile}`
  );

  try {
    const textModifier = new TextModifier(strategy);
    await textModifier.modifyFile(inputFilePath, outputFilePath);
    console.log(`Successfully processed ${inputFile}`);
  } catch (error) {
    handleFileError(error, inputFile);
  }
}

export function handleFileError(error: unknown, inputFile: string): void {
  if (error instanceof FileReadError) {
    console.error(`Failed to read file ${inputFile}:`, error.message);
  } else if (error instanceof FileWriteError) {
    console.error(`Failed to write modified file ${inputFile}:`, error.message);
  } else if (error instanceof StrategyExecutionError) {
    console.error(
      `Strategy execution failed for file ${inputFile}:`,
      error.message
    );
  } else {
    console.error(`Unknown error occurred for file ${inputFile}:`, error);
  }
}
