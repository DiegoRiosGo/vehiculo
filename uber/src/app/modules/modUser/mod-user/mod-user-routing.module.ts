import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModUserPage } from './mod-user.page';

const routes: Routes = [
  {
    path: '',
    component: ModUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModUserPageRoutingModule {}
