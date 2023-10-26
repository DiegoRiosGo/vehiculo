import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfiluserPageRoutingModule } from './perfiluser-routing.module';

import { PerfiluserPage } from './perfiluser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfiluserPageRoutingModule
  ],
  declarations: [PerfiluserPage]
})
export class PerfiluserPageModule {}
