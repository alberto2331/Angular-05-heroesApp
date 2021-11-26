import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../pages/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http:HttpClient) { }
  private baseUrl:string = environment.baseUrl;
  private _auth:Auth | undefined; //le ponemos undefined porque puede estar nulo.
  //Cuando alguien pase por la función de login quiero que la info del usuario
  //se almacene en _auth. NO PODEMOS USAR EL SUSCRIBE EN LA FUNCION login() de este 
  //servicio porque eso destruiría el SUSCRIBE de "login.component.ts" directamente
  // utilizo el operador "pipe":

  get auth():Auth{
    return{...this._auth!};
  }

  verificaAutenticacion():Observable<boolean>{ // esta funcion va a devolver un observable booleano.
    //true si esta correcto  -  false si no es correcto
    if( !localStorage.getItem('Token') ){  //Con esto estoy preguntando si el token existe
      //En caso de que no exista entonces el usuario no esta autenticado y tenemos que sacar
      //al usuario.
      //Tuve un problema porque puse 'token' en lugar de 'Token' y no podía ingresar al la lista de heroes.
      return of(false);
      //recordemos que "verificaAutenticación" debe devolver un observable
      //Por eso podemos hacer 2 cosas para convertir el false en observable:
      // 1) usar la funcion "of" realizando su respectiva importación de rxjs --> "return of(false)";
      // 2) podemos indicar que la funcion tmb puede devolver un booleano "verificaAutenticacion():Observable<boolean>|boolean"
      //El profe se queda con la numero 1
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
          .pipe(
            map( auth => {
              this._auth= auth;
              return true;
            })
          )
  }
  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`) 
      .pipe(
        tap(res => this._auth= res),
        tap(res=>localStorage.setItem("Token", res.id)) //los taps son independientes entre si
// el tap me permite guardar la respuesta del back sin utilizar el "SUSCRIBE"
//con el tap puedo guardar la info en el _auth, PERO ES PRIVATE --> para 
//poder acceder a el desde otras partes de mi app tengo que crearle un get
      )
  }
  logout(){
    this._auth = undefined;
  }
}
