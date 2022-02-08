export interface CustomError {
  error?: any;
  text?: string;
}

export class AppError {
  constructor(public originalError?: CustomError) {}
}
