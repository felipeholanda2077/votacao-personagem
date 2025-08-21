import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { ListaPersonagem } from "./components/lista-personagem/lista-personagem";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    Header, 
    ListaPersonagem, 
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('votacao-personagens');
  isDetailRoute = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isDetailRoute = this.router.url.startsWith('/personagens/');
    });
  }
}
