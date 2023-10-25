import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioSPage } from './inicio-s.page';

const routes: Routes = [
  {
    path: '',
    component: InicioSPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioSPageRoutingModule {}
