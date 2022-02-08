import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {
  override handleError(error: any) {
    alert('an unexpected error occured.');
    console.log(error);
  }
}
