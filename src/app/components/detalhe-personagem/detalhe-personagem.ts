import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PersonagensService, IPersonagem } from '../../services/personagens';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhe-personagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe-personagem.html',
  styleUrls: ['./detalhe-personagem.css']
})
export class DetalhePersonagem implements OnInit {
  personagemId: string | null = null;
  personagem?: IPersonagem;

  constructor(
    private route: ActivatedRoute,
    private personagensService: PersonagensService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Obtém o parâmetro 'id' da rota e busca os dados do personagem
    this.route.paramMap.subscribe(params => {
      this.personagemId = params.get('id');
      if (this.personagemId) {
        this.carregarPersonagem(Number(this.personagemId));
      }
    });
  }

  private carregarPersonagem(id: number): void {
    this.personagensService.getPersonagemPorId(id).subscribe({
      next: (personagem) => {
        this.personagem = personagem;
      },
      error: (error) => {
        console.error('Erro ao carregar personagem:', error);
      }
    });
  }

  voltar(): void {
    this.location.back();
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  }
}
