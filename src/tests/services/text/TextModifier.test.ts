import fs from "fs/promises";
import { TextModifier } from "../../../services";
import { ITextModificationStrategy } from "../../../interfaces";

jest.mock("fs/promises");

describe("TextModifier", () => {
  let textModifier: TextModifier;
  let mockStrategy: jest.Mocked<ITextModificationStrategy>;

  beforeEach(() => {
    mockStrategy = {
      modify: jest.fn(),
    };
    textModifier = new TextModifier(mockStrategy);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should modify the file content based on the strategy and write it to output", async () => {
    const inputPath = "input.txt";
    const outputPath = "output.txt";
    const fileContent = "Hello World";
    const modifiedContent = "HELLO WORLD";

    (fs.readFile as jest.Mock).mockResolvedValue(fileContent);
    mockStrategy.modify.mockReturnValue(modifiedContent);
    (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

    await textModifier.modifyFile(inputPath, outputPath);

    expect(fs.readFile).toHaveBeenCalledWith(inputPath, "utf-8");
    expect(mockStrategy.modify).toHaveBeenCalledWith(fileContent);
    expect(fs.writeFile).toHaveBeenCalledWith(outputPath, modifiedContent);
  });

  it("should throw an error and log when reading the file fails", async () => {
    const inputPath = "input.txt";
    const outputPath = "output.txt";
    const errorMessage = "File read error";

    (fs.readFile as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(
      textModifier.modifyFile(inputPath, outputPath)
    ).rejects.toThrow(errorMessage);

    expect(fs.readFile).toHaveBeenCalledWith(inputPath, "utf-8");
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it("should throw an error and log when writing the file fails", async () => {
    const inputPath = "input.txt";
    const outputPath = "output.txt";
    const fileContent = "Hello World";
    const modifiedContent = "HELLO WORLD";
    const errorMessage = "File write error";

    (fs.readFile as jest.Mock).mockResolvedValue(fileContent);
    mockStrategy.modify.mockReturnValue(modifiedContent);
    (fs.writeFile as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(
      textModifier.modifyFile(inputPath, outputPath)
    ).rejects.toThrow(errorMessage);

    expect(fs.readFile).toHaveBeenCalledWith(inputPath, "utf-8");
    expect(mockStrategy.modify).toHaveBeenCalledWith(fileContent);
    expect(fs.writeFile).toHaveBeenCalledWith(outputPath, modifiedContent);
  });

  it("should allow changing the strategy dynamically", async () => {
    const inputPath = "input.txt";
    const outputPath = "output.txt";
    const fileContent = "Hello World";
    const modifiedContent = "hello world";

    const lowerCaseStrategy: jest.Mocked<ITextModificationStrategy> = {
      modify: jest.fn().mockReturnValue(modifiedContent),
    };

    (fs.readFile as jest.Mock).mockResolvedValue(fileContent);
    (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

    textModifier.replaceStrategies(lowerCaseStrategy);

    await textModifier.modifyFile(inputPath, outputPath);

    expect(lowerCaseStrategy.modify).toHaveBeenCalledWith(fileContent);
    expect(fs.writeFile).toHaveBeenCalledWith(outputPath, modifiedContent);
  });
});
