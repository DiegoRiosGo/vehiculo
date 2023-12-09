import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleclientePage } from './detallecliente.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleclientePageRoutingModule {}
