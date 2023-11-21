import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevacontraenaPage } from './nuevacontraena.page';

const routes: Routes = [
  {
    path: '',
    component: NuevacontraenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevacontraenaPageRoutingModule {}
