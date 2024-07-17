import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminsaldosPageRoutingModule } from './adminsaldos-routing.module';

import { AdminsaldosPage } from './adminsaldos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminsaldosPageRoutingModule
  ],
  declarations: [AdminsaldosPage]
})
export class AdminsaldosPageModule {}
