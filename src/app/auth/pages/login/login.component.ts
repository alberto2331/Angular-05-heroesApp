import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( private ruta:Router,
               private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(){
    
    this.authService.login()
        .subscribe(res=>{
          if(res.id){
            this.ruta.navigate(['./heroes']);
          }
        })    
  }
}
