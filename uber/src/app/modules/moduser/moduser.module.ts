import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuserPageRoutingModule } from './moduser-routing.module';

import { ModuserPage } from './moduser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuserPageRoutingModule
  ],
  declarations: [ModuserPage]
})
export class ModuserPageModule {}
