import { environment } from './../../../environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  searchTracks$(term: string): Observable<any> {
    console.log('que se manda?', `${this.URL}/tracks/${term}`)
    return this.http.get(`${this.URL}/tracks/${term}`)
      .pipe(
        map((dataRaw: any) => dataRaw.data)
      )
  }
}