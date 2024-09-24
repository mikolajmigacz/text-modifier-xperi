import { ITextModificationStrategy } from "../../interfaces";

export class UpperCaseStrategy implements ITextModificationStrategy {
  modify(text: string): string {
    return text.toUpperCase();
  }
}
