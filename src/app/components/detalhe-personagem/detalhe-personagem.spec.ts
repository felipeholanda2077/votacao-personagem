import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePersonagem } from './detalhe-personagem';

describe('DetalhePersonagem', () => {
  let component: DetalhePersonagem;
  let fixture: ComponentFixture<DetalhePersonagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhePersonagem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhePersonagem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
