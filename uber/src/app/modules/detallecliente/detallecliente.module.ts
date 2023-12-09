import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleclientePageRoutingModule } from './detallecliente-routing.module';

import { DetalleclientePage } from './detallecliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleclientePageRoutingModule
  ],
  declarations: [DetalleclientePage]
})
export class DetalleclientePageModule {}
