import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import ICell from '../interfaces/ICell';

@Injectable({ providedIn: 'root' })
export class LevelService {
  apiRoot: string = 'https://localhost:7181/LoadLevel';
  loading: boolean = false;
  constructor(private http: HttpClient) {}

  LoadLevel(level: number): Observable<ICell[]> {
    let apiURL = `${this.apiRoot}/${level}`;
    let response = this.http.get<ICell[]>(apiURL);
    console.log(response);
    return response;
  }
}
