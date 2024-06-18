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


import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AngularFireModule } from '@angular/fire';
import { FirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule, AppRoutingModule,HttpClientModule],
  providers: [StatusBar,SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },CamaraService,SQLite,ClimaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
