import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interfaces';
import { environment } from '../../../environments/environment'; //NO TRAER EL DE PRODUCCION

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl:string=environment.baseUrl;
  constructor( private http: HttpClient ) { }
    
  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`); 
    // le colocamos los [] porque el get me va a traer un array de heroes.
  }

  getHeroe(id:string):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${ id } `);  
    //como efectuamos cambios en el http tenemos que usar backticks en lugar de comillas simples
  }
  getSugerencias(termino:string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`); 
  }
  agregarHeroe(heroe:Heroe){
    return this.http.post<Heroe>(`${this.baseUrl}/heroes?`, heroe)
  }
  actualizarHeroe(heroe:Heroe){
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe)
  }
  borrarHeroe(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`)
  }
}
