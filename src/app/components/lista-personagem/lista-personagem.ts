import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonagemService, Personagem } from '../../services/personagem.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lista-personagem',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-personagem.html',
  styleUrls: ['./lista-personagem.css']
})
export class ListaPersonagem implements OnInit, OnDestroy {
  personagens: Personagem[] = [];
  private subscription: Subscription = new Subscription();
  loading: boolean = true;
  error: string | null = null;
  visibleCount = 8;
  private votingIds = new Set<number>();

  constructor(private personagemService: PersonagemService) {}

  ngOnInit(): void {
    this.carregarPersonagens();
  }

  private carregarPersonagens(): void {
    this.subscription = timer(0, 30000) // Atualiza a cada 30 segundos
      .pipe(
        switchMap(() => this.personagemService.getPersonagens())
      )
      .subscribe({
        next: (data: Personagem[]) => {
          this.personagens = data;
          this.loading = false;
          this.error = null;
        },
        error: (error: any) => {
          console.error('Erro ao carregar personagens:', error);
          this.loading = false;
          this.error = 'Erro ao carregar os personagens. Tente novamente mais tarde.';
        }
      });
  }

  onVotar(personagem: Personagem): void {
    if (this.votingIds.has(personagem.id)) return;
    this.votingIds.add(personagem.id);

    const index = this.personagens.findIndex(p => p.id === personagem.id);
    if (index === -1) return;

    const prevVotos = this.personagens[index].votos ?? 0;
    // Optimistic UI update
    this.personagens[index] = { ...this.personagens[index], votos: prevVotos + 1 };

    this.personagemService.votar(personagem.id).subscribe({
      next: (atualizado: Personagem | undefined) => {
        // If API returns updated entity, sync it; otherwise keep optimistic value
        if (atualizado && atualizado.id != null) {
          const i = this.personagens.findIndex(p => p.id === atualizado.id);
          if (i !== -1) {
            this.personagens[i] = atualizado;
          }
        }
      },
      error: (error: any) => {
        console.error('Erro ao votar:', error);
        // Revert on error
        this.personagens[index] = { ...this.personagens[index], votos: prevVotos };
      },
      complete: () => {
        this.votingIds.delete(personagem.id);
      }
    });
  }

  carregarMais(): void {
    this.visibleCount = Math.min(this.visibleCount + 8, this.personagens.length);
  }

  get hasMore(): boolean {
    return this.personagens.length > this.visibleCount;
  }

  isVoting(id: number): boolean {
    return this.votingIds.has(id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
