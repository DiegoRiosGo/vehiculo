import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevacontraenaPageRoutingModule } from './nuevacontraena-routing.module';

import { NuevacontraenaPage } from './nuevacontraena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevacontraenaPageRoutingModule
  ],
  declarations: [NuevacontraenaPage]
})
export class NuevacontraenaPageModule {}
