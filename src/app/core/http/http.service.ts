import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(url);
  }

  post(url, bodyData) {
    return this.http.post(url, bodyData, this.httpOptions);
  }

  put(url, bodyData) {
    return this.http.put(url, bodyData, this.httpOptions);
  }

  delete(url) {
    return this.http.delete(url, this.httpOptions);
  }

  getResponse(url) {
    return this.http.get(url, { observe: 'response' });
  }

  getWithRetry(url, retryNumber) {
    return this.http.get(url)
      .pipe(
        retry(retryNumber)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  updateHeaders(...args) {
    args.forEach(option => {
      this.httpOptions.headers = this.httpOptions.headers.set(option.key, option.value);
    });
  }

}
