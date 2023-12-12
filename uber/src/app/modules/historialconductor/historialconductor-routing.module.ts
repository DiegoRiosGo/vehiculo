import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialconductorPage } from './historialconductor.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialconductorPageRoutingModule {}
