import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardPersonagem } from '../card-personagem/card-personagem';
import { Subject, takeUntil } from 'rxjs';

interface IApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: IApiCharacter[];
}

interface IApiCharacter {
  id: number;
  name: string;
  image: string;
  type: string;
  status: string;
  species: string;
}

interface IPersonagem {
  id: number;
  nome: string;
  imagem: string;
  votos: number;
  type: string;
  status: string;
  species: string;
}

const BASE_URL = 'https://rickandmortyapi.com/api';

@Component({
  selector: 'app-lista-personagem',
  standalone: true,
  imports: [CommonModule, CardPersonagem, HttpClientModule],
  templateUrl: './lista-personagem.html',
  styleUrl: './lista-personagem.css',
})
export class ListaPersonagem implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private destroy$ = new Subject<void>();
  
  personagens = signal<IPersonagem[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  searchQuery = signal<string>('');
  private searchTimeout: any;

  ngOnInit(): void {
    this.fetchCharacters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchCharacters(page: number = 1, search: string = ''): void {
    this.loading.set(true);
    this.error.set('');

    let url = `${BASE_URL}/character?page=${page}`;
    if (search) {
      url += `&name=${encodeURIComponent(search)}`;
    }

    this.http.get<IApiResponse>(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const characters = response.results.map(character => this.mapToPersonagem(character));
          this.personagens.set(characters);
          this.totalPages.set(response.info.pages);
          this.currentPage.set(page);
          this.loading.set(false);
        },
        error: (error) => this.handleError('Failed to load characters', error)
      });
  }

  private mapToPersonagem(character: IApiCharacter): IPersonagem {
    return {
      id: character.id,
      nome: character.name,
      imagem: character.image,
      votos: 0,
      type: character.type || 'Unknown',
      status: character.status,
      species: character.species
    };
  }

  private handleError(message: string, error: any): void {
    console.error(`${message}:`, error);
    this.error.set(`${message}. Please try again later.`);
    this.loading.set(false);
  }

  incrementarVoto(personagemId: number): void {
    this.personagens.update(personagens => 
      personagens.map(p => 
        p.id === personagemId ? { ...p, votos: p.votos + 1 } : p
      )
    );
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    this.searchTimeout = setTimeout(() => {
      this.currentPage.set(1); 
      this.fetchCharacters(1, query.trim());
    }, 500); 
  }

  clearSearch(): void {
    if (this.searchQuery()) {
      this.searchQuery.set('');
      this.fetchCharacters(1);
    }
  }

  nextPage(): void {
    const nextPage = this.currentPage() + 1;
    if (nextPage <= this.totalPages()) {
      this.fetchCharacters(nextPage, this.searchQuery());
    }
  }

  previousPage(): void {
    const prevPage = this.currentPage() - 1;
    if (prevPage > 0) {
      this.fetchCharacters(prevPage, this.searchQuery());
    }
  }
}
