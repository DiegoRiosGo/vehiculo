import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminvistaPageRoutingModule } from './adminvista-routing.module';

import { AdminvistaPage } from './adminvista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminvistaPageRoutingModule
  ],
  declarations: [AdminvistaPage]
})
export class AdminvistaPageModule {}
