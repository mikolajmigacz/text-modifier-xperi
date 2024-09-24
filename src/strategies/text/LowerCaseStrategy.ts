import { ITextModificationStrategy } from "../../interfaces";

export class LowerCaseStrategy implements ITextModificationStrategy {
  modify(text: string): string {
    return text.toLowerCase();
  }
}
