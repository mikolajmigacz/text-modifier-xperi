export interface ITextModificationStrategy {
  modify(text: string): string;
}
