import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Starship } from '../models/starship.model';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {
  private apiUrl = 'api/starships';

  constructor(private http: HttpClient) { }

  seedStarships(): Observable<object> {
    return this.http.post(`${this.apiUrl}/refresh`, null);
  }

  getStarships(): Observable<Starship[]> {
    return this.http.get<Starship[]>(this.apiUrl);
  }

  getStarship(id: number): Observable<Starship> {
    return this.http.get<Starship>(`${this.apiUrl}/${id}`);
  }

  createStarship(starship: Starship): Observable<Starship> {
    return this.http.post<Starship>(this.apiUrl, starship);
  }

  updateStarship(id: number, starship: Starship): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, starship);
  }

  deleteStarship(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
