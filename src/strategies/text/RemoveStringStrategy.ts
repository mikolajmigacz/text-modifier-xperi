import { ITextModificationStrategy } from "../../interfaces";

export class RemoveStringStrategy implements ITextModificationStrategy {
  private stringsToRemove: string[];

  constructor(stringsToRemove: string[]) {
    this.stringsToRemove = stringsToRemove.sort((a, b) => b.length - a.length);
  }

  modify(text: string): string {
    let result = text;
    for (const str of this.stringsToRemove) {
      const regex = new RegExp(str, "gi");
      result = result.replace(regex, "");
    }
    return result.replace(/[ \t]+/g, " ").trim();
  }
}
