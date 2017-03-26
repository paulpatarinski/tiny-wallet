import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RavenErrorHandler } from "../components/raven-error-handler";
import * as Raven from 'raven-js';

Raven
  .config('https://193b0d50ae2a487982840688079da3c6@sentry.io/152054')
  .install();

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    RavenErrorHandler
  ]
})
export class AppModule { }
