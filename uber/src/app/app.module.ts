import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CamaraService } from './services/servCamara/camara.service';
import { ClimaService } from './services/servClima/clima.service';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },CamaraService,SQLite,ClimaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
