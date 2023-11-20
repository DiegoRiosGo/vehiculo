import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminvehiculoPage } from './adminvehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: AdminvehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminvehiculoPageRoutingModule {}
