import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialclientePageRoutingModule } from './historialcliente-routing.module';

import { HistorialclientePage } from './historialcliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialclientePageRoutingModule
  ],
  declarations: [HistorialclientePage]
})
export class HistorialclientePageModule {}
