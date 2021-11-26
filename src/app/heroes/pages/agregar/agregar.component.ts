import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { switchMap } from 'rxjs/operators'
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // snackbar
import { MatDialog } from '@angular/material/dialog'; //MatDialog
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{      
      width: 100%; /*esto hace que ocupe todo el ancho disponible*/     
      border-radius: 50px;/*Esto le da un borde redondeado*/
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers=[
    {id:'DC Comics',     
      descripcion: 'DC - Comics'
    },{id:'Marvel Comics',     
      descripcion: 'Marvel Comics'
    },
  ];
  heroe:Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img:'',
  }
  constructor(private HS:HeroesService,
              private aR: ActivatedRoute,
              private ruta:Router,
              private snackbar:MatSnackBar, 
              private dialog:MatDialog //MatDialog
              ) { }
  ngOnInit(): void {
    if(!this.ruta.url.includes('editar')){
      return;
    }else{
      this.aR.params
      .pipe(
        switchMap(({id})=>this.HS.getHeroe( id ) )
      )
      .subscribe(banana=> this.heroe = banana)
    }    
  }
  guardar(){
    if(this.heroe.superhero.trim().length === 0){
       return;
    }
    if(this.heroe.id){
      this.HS.actualizarHeroe(this.heroe)
        .subscribe(res=>this.mostrarSnackbar("Registro actualizado"))
    } else{
      this.HS.agregarHeroe(this.heroe)
      .subscribe(heroe=>{
        this.ruta.navigate(['/heroes/editar',heroe.id])
        this.mostrarSnackbar("Registro creado")
      })
    }
  }
  borrarHeroe(){
    const dialogo = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: {...this.heroe}
    });
    dialogo.afterClosed().subscribe(
      (rta)=>{
        if(rta){
            this.HS.borrarHeroe(this.heroe.id !) //con el signo de exclamación le estoy diciendo que siempre va a tener valor el id      
            .subscribe(res=>{
        //En postman vimos que la respuesta del delete es vacío
        //En caso de que se borre, lo unico que quiero hacer es llevar al usuario a la pantalla de "lista de heroes"
        this.ruta.navigate(['/heroes'])})            
      }      
    }    
    )
  }
  mostrarSnackbar( mensaje:string){
    this.snackbar.open(mensaje,'ok! Cerrar',{
      duration:2500
    });
  }
}
