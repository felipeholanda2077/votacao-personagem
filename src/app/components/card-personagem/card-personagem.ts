import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card-personagem',
  imports: [],
  templateUrl: './card-personagem.html',
  styleUrl: './card-personagem.css',
  standalone: true
})
export class CardPersonagem {
  nome = input<string>('');
  imagem = input<string>('');
  totalVotos = input<number>(0);
  personagemId = input<number>(0);
  type = input<string>('');
  status = input<string>('');
  species = input<string>('');

  votou = output<number>();

  onVotar() {
    this.votou.emit(this.personagemId());
  }
}
