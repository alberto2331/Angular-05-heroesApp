import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/pages/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .container{
    margin: 10px;
  }
  `]
})
export class HomeComponent implements OnInit {

  //auth!:Auth; //En "auth" guardaremos la info que nos provea el servicio
  //le colocamos "!" para decirle a angular que confie en nosotros que siempre va a 
  //tener valor.
  get auth(){ //Podemos llevarnos el "auth" a nuestro "home.component.html"
    return this.authServ.auth
  }
  constructor(private ruta:Router,
              private authServ:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.ruta.navigate(['./auth']);
  }
}
