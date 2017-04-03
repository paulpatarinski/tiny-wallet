import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from "../pages/add/add";
import { CardTypeModal } from "../pages/card-type-modal/card-type";
import { BarcodeScannerService } from "../services/barcode.scanner.service";
import { BarcodeFormatMapper } from "../services/barcode.format.mapper";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BarcodeScannerMock } from "../mocks/barcode.scanner.mock";
import { CardService } from "../services/card.service";
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeComponent } from "../components/barcode/barcode";
import { EditPage } from "../pages/edit/edit";
import { BarcodeDataService } from "../components/barcode/barcode.data.service";
import { ElasticModule } from 'angular2-elastic';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    EditPage,
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
    IonicStorageModule.forRoot(),
    ElasticModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    EditPage,
    CardTypeModal,
    BarcodeComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, BarcodeScanner, CardService, StatusBar, SplashScreen, BarcodeScannerService, BarcodeFormatMapper, BarcodeDataService]
})

export class AppModule { }
