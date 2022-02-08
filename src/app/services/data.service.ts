import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  constructor(@Inject(String) private url: string, private http: HttpClient) {}
  getAll() {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  create(resource: any) {
    return this.http
      .post(this.url, JSON.stringify(resource), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(resource: any) {
    return this.http.patch(
      this.url + '/' + resource.id,
      JSON.stringify({
        isRead: true,
      })
    );
    // this.http.put(this.url, JSON.stringify(resource));
  }

  delete(id: any) {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400)
      return throwError(
        () =>
          new BadInputError({
            error: error,
            text: 'Bad Input Error.',
          })
      );

    if (error.status === 404)
      return throwError(
        () =>
          new NotFoundError({
            error: error,
            text: 'Item not found.',
          })
      );

    return throwError(
      () =>
        new AppError({
          error: error,
          text: 'Something bad happened; please try again later.',
        })
    );
  }
}
