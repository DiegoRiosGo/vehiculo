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
    path: 'pagos/:usuarioid',
    loadChildren: () => import('./modules/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'pagosconductor/:usuarioid',
    loadChildren: () => import('./modules/pagosconductor/pagosconductor.module').then( m => m.PagosconductorPageModule)
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
    path: 'recuperar/:usuarioid',
    loadChildren: () => import('./modules/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./modules/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'adminvista/:usuarioid',
    loadChildren: () => import('./modules/adminvista/adminvista.module').then( m => m.AdminvistaPageModule)
  },
  {
    path: 'mapa/:usuarioid',
    loadChildren: () => import('./modules/mapa/mapa.module').then( m => m.MapaPageModule)
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
  {
    path: 'nuevacontrasena',
    loadChildren: () => import('./modules/nuevacontraena/nuevacontraena.module').then( m => m.NuevacontraenaPageModule)

  },
  {
    path: 'perfilconductor/:usuarioid',
    loadChildren: () => import('./modules/perfilconductor/perfilconductor.module').then( m => m.PerfilconductorPageModule)
  },
  {
    path: 'detalleconductor/:idviaje',
    loadChildren: () => import('./modules/detalleconductor/detalleconductor.module').then( m => m.DetalleconductorPageModule)
  },
  {
    path: 'detallecliente/:usuarioid',
    loadChildren: () => import('./modules/detallecliente/detallecliente.module').then( m => m.DetalleclientePageModule)
  },
  {
    path: 'historialconductor/:usuarioid',
    loadChildren: () => import('./modules/historialconductor/historialconductor.module').then( m => m.HistorialconductorPageModule)
  },
  {
    path: 'historialcliente/:usuarioid',
    loadChildren: () => import('./modules/historialcliente/historialcliente.module').then( m => m.HistorialclientePageModule)
  },
 





 



  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
