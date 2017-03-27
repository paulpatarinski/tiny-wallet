import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { RavenErrorHandler } from "../components/raven-error-handler";
import * as Raven from 'raven-js';
import { ScanPage } from "../pages/scan/scan";
import { CardTypeModal } from "../pages/card-type-modal/card-type";
import { BarcodeScannerService } from "../services/barcode.scanner.service";
import { BarcodeFormatMapper } from "../services/barcode.format.mapper";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BarcodeScannerMock } from "../mocks/barcode.scanner.mock";
import { CardService } from "../services/card.service";
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeComponent } from "../components/barcode-component";

Raven
  .config('https://193b0d50ae2a487982840688079da3c6@sentry.io/152054')
  .install();


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScanPage,
    CardTypeModal,
    BarcodeComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsHideOnSubPages: true,
      statusPadding: true,
      platforms: {
        statusPadding: true,
        ios: {
          statusbarPadding: true,
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScanPage,
    CardTypeModal,
    BarcodeComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, BarcodeScanner, CardService, StatusBar, SplashScreen, BarcodeScannerService, BarcodeFormatMapper, RavenErrorHandler]
})

export class AppModule { }
