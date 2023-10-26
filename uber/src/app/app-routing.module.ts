import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./modules/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'moduser',
    loadChildren: () => import('./modules/moduser/moduser.module').then( m => m.ModuserPageModule)
  },
  {
    path: 'perfiluser',
    loadChildren: () => import('./modules/perfiluser/perfiluser.module').then( m => m.PerfiluserPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./modules/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./modules/registro/registro.module').then( m => m.RegistroPageModule)
  },  {
    path: 'adminvista',
    loadChildren: () => import('./modules/adminvista/adminvista.module').then( m => m.AdminvistaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
