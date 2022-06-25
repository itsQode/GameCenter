import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, concatAll, map } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { APIResponse, IGame } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<IGame>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params.append('search', search);
    }

    return this.http.get<APIResponse<IGame>>(`${env.BASE_URL}/games`, {
      params,
    });
  }

  getGameDetails(id: string): Observable<IGame> {
    const gameInfoRequest = this.http.get<IGame>(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenShotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );
    return forkJoin({
      gameInfoRequest:gameInfoRequest.pipe(catchError((err)=> of(err))) ,
      gameTrailersRequest:gameTrailersRequest.pipe(catchError((err)=> of(err))) ,
      gameScreenShotsRequest:gameScreenShotsRequest.pipe(catchError((err)=> of(err)))
    }).pipe(
      map((response:any)=>{
       return <IGame>{
          ...response['gameInfoRequest'],
          screenshots:response['gameScreenShotsRequest']?.results,
          trailers: response['gameTrailersRequest']?.results
        }
      })
    )
  }
}
