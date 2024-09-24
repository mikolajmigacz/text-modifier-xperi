import { UpperCaseStrategy } from "../../../strategies";

describe("UpperCaseStrategy", () => {
  let upperCaseStrategy: UpperCaseStrategy;

  beforeAll(() => {
    upperCaseStrategy = new UpperCaseStrategy();
  });

  it("should convert lowercase text to uppercase", () => {
    const input = "hello world";
    const result = upperCaseStrategy.modify(input);
    expect(result).toBe("HELLO WORLD");
  });

  it("should keep uppercase text as uppercase", () => {
    const input = "HELLO WORLD";
    const result = upperCaseStrategy.modify(input);
    expect(result).toBe("HELLO WORLD");
  });

  it("should convert mixed-case text to uppercase", () => {
    const input = "Hello World";
    const result = upperCaseStrategy.modify(input);
    expect(result).toBe("HELLO WORLD");
  });

  it("should handle text with numbers and special characters", () => {
    const input = "Hello123 #world!";
    const result = upperCaseStrategy.modify(input);
    expect(result).toBe("HELLO123 #WORLD!");
  });

  it("should handle an empty string", () => {
    const input = "";
    const result = upperCaseStrategy.modify(input);
    expect(result).toBe("");
  });

  it("should handle strings with spaces only", () => {
    const input = "     ";
    const result = upperCaseStrategy.modify(input);
    expect(result).toBe("     ");
  });

  it("should handle non-ASCII characters (like accents and emojis)", () => {
    const input = "Café 😊";
    const result = upperCaseStrategy.modify(input);
    expect(result).toBe("CAFÉ 😊");
  });
});
