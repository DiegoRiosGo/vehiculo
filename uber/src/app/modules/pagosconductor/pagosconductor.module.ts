import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosconductorPageRoutingModule } from './pagosconductor-routing.module';

import { PaymentPage  } from './pagosconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosconductorPageRoutingModule
  ],
  declarations: [PaymentPage ]
})
export class PagosconductorPageModule {}
