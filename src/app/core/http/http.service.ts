import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  get(url, paramsObj = {}) {
    const params = new HttpParams();
    Object.keys(paramsObj).forEach(paramKey => params.set(paramKey, paramsObj[paramKey]));
    const options = params ? { params } : {};
    // const params = new HttpParams({fromString: 'name=value'});
    return this.http.get<any>(url, options);
  }

  post(url, bodyData) {
    return this.http.post<any>(url, bodyData, httpOptions);
  }

  put(url, bodyData) {
    return this.http.put<any>(url, bodyData, httpOptions);
  }

  delete(url) {
    return this.http.delete<any>(url, httpOptions);
  }

  getResponse(url) {
    return this.http.get<any>(url, { observe: 'response' });
  }

  getWithRetry(url, retryNumber) {
    return this.http.get<any>(url)
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
      httpOptions.headers = httpOptions.headers.set(option.key, option.value);
    });
  }

}
