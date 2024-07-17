import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminsaldosPage } from './adminsaldos.page';

const routes: Routes = [
  {
    path: '',
    component: AdminsaldosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsaldosPageRoutingModule {}
