import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskEmailPageRoutingModule } from './ask-email-routing.module';

import { AskEmailPage } from './ask-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AskEmailPageRoutingModule
  ],
  declarations: [AskEmailPage]
})
export class AskEmailPageModule {}
