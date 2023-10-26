import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminvistaPage } from './adminvista.page';

const routes: Routes = [
  {
    path: '',
    component: AdminvistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminvistaPageRoutingModule {}
