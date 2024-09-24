import fs from "fs/promises";
import path from "path";
import { ITextModificationStrategy } from "../../interfaces";
import {
  FileReadError,
  FileWriteError,
  StrategyExecutionError,
} from "../../errors";

export class TextModifier {
  private strategies: ITextModificationStrategy[];

  constructor(
    strategies: ITextModificationStrategy | ITextModificationStrategy[]
  ) {
    this.strategies = Array.isArray(strategies) ? strategies : [strategies];
  }

  replaceStrategies(
    strategies: ITextModificationStrategy | ITextModificationStrategy[]
  ): void {
    this.strategies = Array.isArray(strategies) ? strategies : [strategies];
  }

  addStrategy(strategy: ITextModificationStrategy): void {
    this.strategies.push(strategy);
  }

  async modifyFile(inputPath: string, outputPath: string): Promise<void> {
    let content: string;

    try {
      content = await fs.readFile(inputPath, "utf-8");
    } catch (error) {
      if (error instanceof Error) {
        throw new FileReadError(
          `Error reading file ${inputPath}: ${error.message}`
        );
      }
      throw new FileReadError(`Error reading file ${inputPath}: Unknown error`);
    }

    try {
      const outputDir = path.dirname(outputPath);
      await fs.mkdir(outputDir, { recursive: true });

      for (const strategy of this.strategies) {
        try {
          content = strategy.modify(content);
        } catch (error) {
          if (error instanceof Error) {
            throw new StrategyExecutionError(
              `Error executing strategy ${strategy.constructor.name}: ${error.message}`
            );
          }
          throw new StrategyExecutionError(
            `Error executing strategy ${strategy.constructor.name}: Unknown error`
          );
        }
      }

      await fs.writeFile(outputPath, content);
    } catch (error) {
      if (error instanceof StrategyExecutionError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new FileWriteError(
          `Error writing file ${outputPath}: ${error.message}`
        );
      }
      throw new FileWriteError(
        `Error writing file ${outputPath}: Unknown error`
      );
    }
  }
}
