import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

export interface Personagem {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  votos: number;
}

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {
  private apiUrl = 'http://localhost:3000/personagens';

  constructor(private http: HttpClient) { }

  getPersonagens(): Observable<Personagem[]> {
    return this.http.get<Personagem[]>(this.apiUrl);
  }

  votar(id: number): Observable<Personagem> {
    // Generic approach compatible with json-server: GET current, then PATCH votos
    return this.http.get<Personagem>(`${this.apiUrl}/${id}`).pipe(
      switchMap((p) => {
        const votos = (p?.votos ?? 0) + 1;
        return this.http.patch<Personagem>(`${this.apiUrl}/${id}`, { votos });
      })
    );
  }
}
