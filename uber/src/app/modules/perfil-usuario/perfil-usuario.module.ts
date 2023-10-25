import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilUsuarioPageRoutingModule } from './perfil-usuario-routing.module';

import { PerfilUsuarioPage } from './perfil-usuario.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilUsuarioPageRoutingModule
  ],
  declarations: [PerfilUsuarioPage, BarcodeScanningModalComponent], 
})
export class PerfilUsuarioPageModule {}
