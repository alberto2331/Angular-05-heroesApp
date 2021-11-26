import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width:100%;  /*este estilo es para que sea responsive la imagen del heroe*/
      border-radius:10px; /*esto es para que queden redondeado los bordes de la imagen*/
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;
  constructor(  private aR:ActivatedRoute,
                private heroeService: HeroesService,
                private router: Router) { }

  ngOnInit(): void {
  this.aR.params
    .pipe(
      switchMap(({id})=> this.heroeService.getHeroe(id))
    )
    .subscribe(rta=> this.heroe=rta)
  }
  regresar(){
    this.router.navigate(["/heroes/listado"]);
  }
}
