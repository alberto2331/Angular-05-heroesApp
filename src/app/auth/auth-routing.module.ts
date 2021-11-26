import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
const routes: Routes=[
{
  path:'',// va vacío porque trabaja con el "/auth" y eso lo da la ruta principal
  children:[
    {
      path: 'login',
      component:LoginComponent
    },
    {
      path: 'registro',
      component:RegistroComponent
    },
    {
      path: '**',
      redirectTo:'login'
    },
  ]
}
]
@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
