import { ITextModificationStrategy } from "../../interfaces";

export class ReverseTextStrategy implements ITextModificationStrategy {
  modify(text: string): string {
    return text
      .split("\n")
      .reverse()
      .map((line) => line.split("").reverse().join(""))
      .join("");
  }
}
