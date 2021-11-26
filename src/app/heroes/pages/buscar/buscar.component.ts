import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  terminoDeBusqueda:string='';

  heroes:Heroe[] = [];
  heroeSeleccionado:Heroe | undefined; 
  constructor( private service:HeroesService) { }

  ngOnInit(): void {
  }
  buscando(){  
    this.service.getSugerencias(this.terminoDeBusqueda.trim())
    .subscribe(res=> this.heroes=res)
  }
  opcionSeleccionada(evento:MatAutocompleteSelectedEvent){
    if(!evento.option.value){ //quiere decir que si el evento no trae valor entonces...
      this.heroeSeleccionado=undefined;
      return;
    }
    const heroe:Heroe = evento.option.value;
    this.terminoDeBusqueda=heroe.superhero;
    this.service.getHeroe(heroe.id!) //el signo de admiración es para decirle que confie en mi que siempre va a existir un heroe.id
        .subscribe(respuesta=> this.heroeSeleccionado=respuesta)
  }
}
