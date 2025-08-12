import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPersonagem } from '../card-personagem/card-personagem';

interface IPersonagem {
  id: number;
  nome: string;
  imagem: string;
  votos: number;
}

@Component({
  selector: 'app-lista-personagem',
  imports: [CommonModule, CardPersonagem],
  templateUrl: './lista-personagem.html',
  styleUrl: './lista-personagem.css',
})

export class ListaPersonagem {
  personagens = signal<IPersonagem[]>([
    {
      id: 1,
      nome: 'Rick Sanchez',
      imagem: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      votos: 0
    },
    {
      id: 2,
      nome: 'Morty Smith',
      imagem: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      votos: 0
    },
    {
      id: 3,
      nome: 'Summer Smith',
      imagem: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      votos: 0
    },
    {
      id: 4,
      nome: 'Beth Smith',
      imagem: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
      votos: 0
    },
    {
      id: 5,
      nome: 'Jerry Smith',
      imagem: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
      votos: 0
    }
  ]);

  incrementarVoto(personagemId: number) {
    this.personagens.update(personagens => 
      personagens.map(p => 
        p.id === personagemId ? { ...p, votos: p.votos + 1 } : p
      )
    );
  }
}
