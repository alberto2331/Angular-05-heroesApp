import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate{

  constructor(private autSer:AuthService,
              private ruta:Router){ 
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      return this.autSer.verificaAutenticacion().pipe(
        tap(estaAutenticado =>{
          if(!estaAutenticado){
            console.log("esto la esta cagando: CanActive");
            this.ruta.navigate(['./auth/login'])
          }
        })
      );
      //if(this.autSer.auth.id){
      //  return true;
      //}
      //console.log("Bloqueado por canActivate")
      //return false;    
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.autSer.verificaAutenticacion().pipe(
        tap(estaAutenticado =>{
          if(!estaAutenticado){
            console.log("esto la esta cagando: CanLoad");
            this.ruta.navigate(['./auth/login'])
          }
        })
      );
      //if(this.autSer.auth.id){
      //  return true;
      //}
      //console.log("Bloqueado por canLoad")
      //return false;    
  }
}
