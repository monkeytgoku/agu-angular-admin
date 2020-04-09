import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { last, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  progressMessage = new Subject();
  $progressMessage;

  constructor(private http: HttpClient) {
    this.$progressMessage = this.progressMessage.asObservable();
  }

  upload(file) {
    // Every progress event triggers change detection, so only turn them on if you truly intend to report progress in the UI.
    // When using HttpClient#request() with an HTTP method,
    // configure with observe: 'events' to see all events, including the progress of transfers.
    const req = new HttpRequest('POST', '/upload/file', file, {
      reportProgress: true
    });

    // The `HttpClient.request` API produces a raw event stream
    // which includes start (sent), progress, and response events.
    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap(message => this.showProgress(message)),
      last(), // return last (completed) message to caller
    );
  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  private showProgress(msg) {
    this.$progressMessage.next(msg);
  }
}
