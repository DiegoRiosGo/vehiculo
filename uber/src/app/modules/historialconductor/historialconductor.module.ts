import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialconductorPageRoutingModule } from './historialconductor-routing.module';

import { HistorialconductorPage } from './historialconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialconductorPageRoutingModule
  ],
  declarations: [HistorialconductorPage]
})
export class HistorialconductorPageModule {}
