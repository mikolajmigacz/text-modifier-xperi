import { LowerCaseStrategy } from "../../../strategies";

describe("LowerCaseStrategy", () => {
  let lowerCaseStrategy: LowerCaseStrategy;

  beforeAll(() => {
    lowerCaseStrategy = new LowerCaseStrategy();
  });

  it("should convert uppercase text to lowercase", () => {
    const input = "HELLO WORLD";
    const result = lowerCaseStrategy.modify(input);
    expect(result).toBe("hello world");
  });

  it("should keep lowercase text as lowercase", () => {
    const input = "hello world";
    const result = lowerCaseStrategy.modify(input);
    expect(result).toBe("hello world");
  });

  it("should convert mixed-case text to lowercase", () => {
    const input = "Hello World";
    const result = lowerCaseStrategy.modify(input);
    expect(result).toBe("hello world");
  });

  it("should handle text with numbers and special characters", () => {
    const input = "Hello123 #WORLD!";
    const result = lowerCaseStrategy.modify(input);
    expect(result).toBe("hello123 #world!");
  });

  it("should handle an empty string", () => {
    const input = "";
    const result = lowerCaseStrategy.modify(input);
    expect(result).toBe("");
  });

  it("should handle strings with spaces only", () => {
    const input = "     ";
    const result = lowerCaseStrategy.modify(input);
    expect(result).toBe("     ");
  });

  it("should handle non-ASCII characters (like accents and emojis)", () => {
    const input = "Café 😊";
    const result = lowerCaseStrategy.modify(input);
    expect(result).toBe("café 😊");
  });
});
