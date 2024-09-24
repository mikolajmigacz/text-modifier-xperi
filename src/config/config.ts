import path from "path";
import dotenv from "dotenv";
import { Config } from "./config.types";

dotenv.config();

export const config: Config = {
  inputFolder:
    process.env.INPUT_FOLDER || path.resolve(__dirname, "../../input"),
  outputFolder:
    process.env.OUTPUT_FOLDER || path.resolve(__dirname, "../../output"),
  inputFiles: ["input1.txt", "input2.txt", "input3.txt"],
};
