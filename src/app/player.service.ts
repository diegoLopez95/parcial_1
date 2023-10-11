import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Player } from './player';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor( private http: HttpClient ) { }

  private playersURL = 'http://localhost:3000/players';  // URL to players api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET the players from the api */
  getPlayers(): Observable<any>{
    const url = `${this.playersURL}`
    const response = this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched players from api`)),
      catchError(this.handleError<any>(`getPlayers from api`))
    );
    return response;
  }

  /** POST: add a new hero to the server */
  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersURL, player, this.httpOptions).pipe(
      tap((newPlayer: Player) => console.log(`added player w/ id=${newPlayer.id}`)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  deletePlayer(id: number): Observable<Player> {
    const url = `${this.playersURL}/${id}`;
  
    return this.http.delete<Player>(url,this.httpOptions).pipe(
      tap(_ => console.log(`deleted player id=${id}`)),
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }

  /** GET player by id. Will 404 if id not found */
  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersURL}/${id}`;
    return this.http.get<Player>(url).pipe(
      tap(_ => console.log(`fetched player id=${id}`)),
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
