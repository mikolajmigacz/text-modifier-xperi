export class FileWriteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileWriteError";
  }
}
