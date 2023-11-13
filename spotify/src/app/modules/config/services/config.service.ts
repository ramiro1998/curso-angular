import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  createTrack$(track: TrackModel): Observable<any> {
    return this.http.post(`${this.URL}/tracks/add`, track)
      .pipe(
        map((trackCreated: any) => {
          return trackCreated
        }),
        catchError((error: any) => {
          console.log('Error creating track:', error);
          return throwError(error);
        })
      )
  }

  editTrack$(track: TrackModel, id: string | number): Observable<any> {
    return this.http.put(`${this.URL}/tracks/edit/${id}`, track)
      .pipe(
        map((trackUpdated: any) => {
          return trackUpdated
        }),
        catchError((error: any) => {
          console.log('Error updating track:', error);
          return throwError(error);
        })
      )
  }

  deleteTrack$(id: string | number): Observable<any> {
    return this.http.delete(`${this.URL}/tracks/delete/${id}`)
      .pipe(
        map((trackDeleted: any) => {
          return trackDeleted
        }),
        catchError((error: any) => {
          console.log('Error deleting track:', error);
          return throwError(error);
        })
      )
  }
}
