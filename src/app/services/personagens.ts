import { Injectable } from '@angular/core';

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
  private personagens: IPersonagem[] = [
    { 
      id: 1, 
      nome: 'Gandalf', 
      imagem: 'assets/gandalf.jpg', 
      votos: 0,
      type: 'Maia',
      status: 'Alive',
      species: 'Maia'
    },
    { 
      id: 2, 
      nome: 'Frodo', 
      imagem: 'assets/frodo.jpg', 
      votos: 0,
      type: 'Hobbit',
      status: 'Alive',
      species: 'Hobbit'
    },
    { 
      id: 3, 
      nome: 'Aragorn', 
      imagem: 'assets/aragorn.jpg', 
      votos: 0,
      type: 'Human',
      status: 'Alive',
      species: 'Human'
    },
    { 
      id: 4, 
      nome: 'Legolas', 
      imagem: 'assets/legolas.jpg', 
      votos: 0,
      type: 'Elf',
      status: 'Alive',
      species: 'Elf'
    },
    { 
      id: 5, 
      nome: 'Gimli', 
      imagem: 'assets/gimli.jpg', 
      votos: 0,
      type: 'Dwarf',
      status: 'Alive',
      species: 'Dwarf'
    },
    { 
      id: 6, 
      nome: 'Gollum', 
      imagem: 'assets/gollum.jpg', 
      votos: 0,
      type: 'River-folk',
      status: 'Alive',
      species: 'Hobbit (formerly)'
    },
    { 
      id: 7, 
      nome: 'Galadriel', 
      imagem: 'assets/galadriel.jpg', 
      votos: 0,
      type: 'Elf',
      status: 'Alive',
      species: 'Elf'
    },
    { 
      id: 8, 
      nome: 'Boromir', 
      imagem: 'assets/boromir.jpg', 
      votos: 0,
      type: 'Human',
      status: 'Deceased',
      species: 'Human'
    },
    { 
      id: 9, 
      nome: 'Saruman', 
      imagem: 'assets/saruman.jpg', 
      votos: 0,
      type: 'Maia',
      status: 'Deceased',
      species: 'Maia'
    }
  ];

  constructor() { }

  getPersonagens(): IPersonagem[] {
    return [...this.personagens];
  }

  adicionarVoto(idDoPersonagem: number): void {
    const personagem = this.personagens.find(p => p.id === idDoPersonagem);
    if (personagem) {
      personagem.votos++;
    }
  }
}
