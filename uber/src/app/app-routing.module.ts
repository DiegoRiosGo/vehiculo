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
    path: 'moduser/:usuarioid',
    loadChildren: () => import('./modules/moduser/moduser.module').then( m => m.ModuserPageModule)
  },
  {
    path: 'perfiluser/:usuarioid',
    loadChildren: () => import('./modules/perfiluser/perfiluser.module').then( m => m.PerfiluserPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./modules/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./modules/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'adminvista',
    loadChildren: () => import('./modules/adminvista/adminvista.module').then( m => m.AdminvistaPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./modules/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'prueba',
    loadChildren: () => import('./modules/prueba/prueba.module').then( m => m.PruebaPageModule)
  },
  {
    path: 'registroadmin',
    loadChildren: () => import('./modules/registroadmin/registroadmin.module').then( m => m.RegistroadminPageModule)
  },
  {
    path: 'adminvehiculo',
    loadChildren: () => import('./modules/adminvehiculo/adminvehiculo.module').then( m => m.AdminvehiculoPageModule)
  },
  {
    path: 'ask-email/:usuarioid',
    loadChildren: () => import('./modules/ask-email/ask-email.module').then( m => m.AskEmailPageModule)
  },


  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
