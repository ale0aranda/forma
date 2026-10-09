export class ProfileRepositoryError extends Error {
  code: 'username_taken' | 'unknown';

  constructor(code: 'username_taken' | 'unknown', message: string) {
    super(message);

    this.name = 'ProfileRepositoryError';
    this.code = code;
  }
}
