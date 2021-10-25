import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent implements OnInit {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];

  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  buscar(evento: string) {
    this.termino = evento;
    this.hayError = false;
    this.mostrarSugerencias = false;
    this.paisService.buscarPais(evento).subscribe(
      (paises: Country[]) => {
        this.paises = paises;
        console.log(paises);
      },
      (error) => {
        this.hayError = true;
        this.paises = [];
        console.log(error);
      }
    );
  }

  sugerencias(evento: string) {
    this.hayError = false;
    this.termino = evento;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(evento).subscribe(
      (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
      },
      (err) => {
        this.paisesSugeridos = [];
      }
    );
  }

  
}
