import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPersonagem } from '../card-personagem/card-personagem';
import { PersonagensService, IPersonagem } from '../../services/personagens';

@Component({
  selector: 'app-lista-personagem',
  standalone: true,
  imports: [CommonModule, CardPersonagem],
  templateUrl: './lista-personagem.html',
  styleUrl: './lista-personagem.css',
})
export class ListaPersonagem implements OnInit, OnDestroy {
  private personagensService = inject(PersonagensService);
  
  personagens = signal<IPersonagem[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');

  ngOnInit(): void {
    this.carregarPersonagens();
  }

  ngOnDestroy(): void {
    // Limpeza se necessário
  }

  private carregarPersonagens(): void {
    this.loading.set(true);
    try {
      const personagens = this.personagensService.getPersonagens();
      this.personagens.set(personagens);
    } catch (error) {
      console.error('Erro ao carregar personagens:', error);
      this.error.set('Erro ao carregar a lista de personagens.');
    } finally {
      this.loading.set(false);
    }
  }

  incrementarVoto(personagemId: number): void {
    this.personagens.update(personagens => 
      personagens.map(p => 
        p.id === personagemId ? { ...p, votos: p.votos + 1 } : p
      )
    );
  }
}
