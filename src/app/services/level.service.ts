import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import ICell from '../interfaces/ICell';

@Injectable({ providedIn: 'root' })
export class LevelService {
  private apiRoot = environment.apiUrl;
  constructor(private http: HttpClient) {}

  LoadLevel(level: number): Observable<ICell[]> {
    let apiURL = `${this.apiRoot}/GetLevel/${level}`;
    let response = this.http.get<ICell[]>(apiURL).pipe(
      tap((data) => console.log('Response: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
    return response;
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${
        err.message || err.body.error
      }`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
