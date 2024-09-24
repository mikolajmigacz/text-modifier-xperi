import { ReverseTextStrategy } from "../../../strategies";

describe("ReverseTextStrategy", () => {
  let reverseTextStrategy: ReverseTextStrategy;

  beforeAll(() => {
    reverseTextStrategy = new ReverseTextStrategy();
  });

  it("should reverse a basic string", () => {
    const input = "hello world";
    const result = reverseTextStrategy.modify(input);
    expect(result).toBe("dlrow olleh");
  });

  it("should reverse a string with mixed case", () => {
    const input = "Hello World";
    const result = reverseTextStrategy.modify(input);
    expect(result).toBe("dlroW olleH");
  });

  it("should handle strings with numbers and special characters", () => {
    const input = "Hello123 #WORLD!";
    const result = reverseTextStrategy.modify(input);
    expect(result).toBe("!DLROW# 321olleH");
  });

  it("should handle an empty string", () => {
    const input = "";
    const result = reverseTextStrategy.modify(input);
    expect(result).toBe("");
  });

  it("should handle strings with spaces only", () => {
    const input = "     ";
    const result = reverseTextStrategy.modify(input);
    expect(result).toBe("     ");
  });

  it("should handle palindromes (the result should be the same as the input)", () => {
    const input = "madam";
    const result = reverseTextStrategy.modify(input);
    expect(result).toBe("madam");
  });

  it("should reverse a string with different punctuation marks", () => {
    const input = "hello, world!";
    const result = reverseTextStrategy.modify(input);
    expect(result).toBe("!dlrow ,olleh");
  });
});
