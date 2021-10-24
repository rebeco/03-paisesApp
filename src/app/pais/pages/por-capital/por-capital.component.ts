import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent implements OnInit {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  buscar(evento: string) {
    this.termino = evento;
    this.hayError = false;
    this.paisService.buscarCapital(evento).subscribe(
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
}
