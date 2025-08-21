import { Injectable } from '@angular/core';
import { Personagem } from './personagem.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface IPersonagem {
  id: number;
  nome: string;
  imagem: string;
  votos: number;
  type: string;
  status: string;
  species: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonagensService {
  private baseUrl = 'http://localhost:3000/personagens';

  constructor(private http: HttpClient) { }

  getPersonagens() {
    return this.http.get<IPersonagem[]>(this.baseUrl);
  }

  getPersonagemPorId(id: number): Observable<IPersonagem> {
    return this.http.get<IPersonagem>(`${this.baseUrl}/${id}`);
  }

  votar(id: number): Observable<Personagem> {
    
    return this.http.get<Personagem>(`${this.baseUrl}/${id}`).pipe(
      switchMap((personagem: Personagem) => {
      
        const updatedPersonagem = {
          ...personagem,
          votos: (personagem.votos || 0) + 1
        };
       
        return this.http.put<Personagem>(`${this.baseUrl}/${id}`, updatedPersonagem);
      })
    );
  }
}
