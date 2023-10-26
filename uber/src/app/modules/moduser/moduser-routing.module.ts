import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuserPage } from './moduser.page';

const routes: Routes = [
  {
    path: '',
    component: ModuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuserPageRoutingModule {}
