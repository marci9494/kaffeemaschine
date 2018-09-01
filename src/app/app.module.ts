import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {StatusPage} from '../pages/status/status';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {OrderPage} from '../pages/order/order';
import {TabsPage} from '../pages/tabs/tabs';
import {HttpClientModule} from "@angular/common/http";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {RestProvider} from '../providers/rest/rest';
import { HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from 'ionic-native-http-connection-backend';
import { Platform } from 'ionic-angular';

@NgModule({
  declarations: [
    MyApp,
    StatusPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrderPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    NativeHttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StatusPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
    RestProvider
  ]
})
export class AppModule {}
