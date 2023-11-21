import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskEmailPage } from './ask-email.page';

const routes: Routes = [
  {
    path: '',
    component: AskEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskEmailPageRoutingModule {}
