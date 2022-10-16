import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import ICell from '../interfaces/ICell';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class LevelService {
  private apiRoot = environment.apiUrl;
  constructor(private http: HttpClient) {}

  LoadLevel(level: number): Observable<ICell[]> {
    let apiURL = `${this.apiRoot}/GetLevel/${level}`;
    let response = this.http.get<ICell[]>(apiURL);
    console.log(response);
    return response;
  }
}
