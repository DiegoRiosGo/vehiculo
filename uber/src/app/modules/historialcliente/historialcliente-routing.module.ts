import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialclientePage } from './historialcliente.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialclientePageRoutingModule {}
