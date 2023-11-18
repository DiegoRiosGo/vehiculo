import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroadminPageRoutingModule } from './registroadmin-routing.module';

import { RegistroadminPage } from './registroadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroadminPageRoutingModule
  ],
  declarations: [RegistroadminPage]
})
export class RegistroadminPageModule {}
