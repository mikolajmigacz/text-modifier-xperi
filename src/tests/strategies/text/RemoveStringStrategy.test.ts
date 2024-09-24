import { RemoveStringStrategy } from "../../../strategies";

describe("RemoveStringStrategy", () => {
  it("should remove all occurrences of multiple strings case-insensitively", () => {
    const strategy = new RemoveStringStrategy(["foo", "bar"]);
    const input = "FOO Bar foo BAR baz";
    expect(strategy.modify(input)).toBe("baz");
  });

  it("should handle input with no occurrences of the strings to remove", () => {
    const strategy = new RemoveStringStrategy(["foo", "bar"]);
    const input = "hello world";
    expect(strategy.modify(input)).toBe("hello world");
  });

  it("should remove strings when they occur multiple times in different positions", () => {
    const strategy = new RemoveStringStrategy(["foo", "bar"]);
    const input = "fooBarFOObar";
    expect(strategy.modify(input)).toBe("");
  });

  it("should remove whole words and substrings", () => {
    const strategy = new RemoveStringStrategy(["foo", "bar"]);
    const input = "foobar foobaz barfoo";
    expect(strategy.modify(input)).toBe("baz");
  });

  it("should handle an empty input string", () => {
    const strategy = new RemoveStringStrategy(["foo", "bar"]);
    expect(strategy.modify("")).toBe("");
  });

  it("should handle a string with spaces only", () => {
    const strategy = new RemoveStringStrategy(["foo", "bar"]);
    expect(strategy.modify("   ")).toBe("");
  });

  it("should remove strings with special characters", () => {
    const strategy = new RemoveStringStrategy(["#world", "@hello"]);
    const input = "Hello123 #WORLD! @hello";
    expect(strategy.modify(input)).toBe("Hello123 !");
  });

  it("should remove non-ASCII strings like accents or emojis", () => {
    const strategy = new RemoveStringStrategy(["😊", "é"]);
    const input = "Hello 😊 World é!";
    expect(strategy.modify(input)).toBe("Hello World !");
  });

  it("should handle overlapping strings to remove", () => {
    const strategy = new RemoveStringStrategy(["foo", "of"]);
    const input = "fofoo";
    expect(strategy.modify(input)).toBe("fo");
  });

  it("should be case-insensitive when removing strings", () => {
    const strategy = new RemoveStringStrategy(["foo", "bar"]);
    const input = "FOO foo Foo BAR bar Bar";
    expect(strategy.modify(input)).toBe("");
  });

  it("should remove multiple occurrences of different strings", () => {
    const strategy = new RemoveStringStrategy(["apple", "banana", "cherry"]);
    const input = "I like APPLE and banana, but not CHERRY or Apple.";
    expect(strategy.modify(input)).toBe("I like and , but not or .");
  });

  it("should handle strings to remove that are subsets of each other", () => {
    const strategy = new RemoveStringStrategy(["in", "input", "put"]);
    const input = "This is an input string with 'in' and 'put'.";
    expect(strategy.modify(input)).toBe("This is an strg with '' and ''.");
  });
});
