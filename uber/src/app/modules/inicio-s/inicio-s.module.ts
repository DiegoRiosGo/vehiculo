import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSPageRoutingModule } from './inicio-s-routing.module';

import { InicioSPage } from './inicio-s.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSPageRoutingModule
  ],
  declarations: [InicioSPage]
})
export class InicioSPageModule {}
