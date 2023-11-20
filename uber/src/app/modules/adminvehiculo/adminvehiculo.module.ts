import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminvehiculoPageRoutingModule } from './adminvehiculo-routing.module';

import { AdminvehiculoPage } from './adminvehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminvehiculoPageRoutingModule
  ],
  declarations: [AdminvehiculoPage]
})
export class AdminvehiculoPageModule {}
