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
import { CardService } from "../services/card.service";
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeComponent } from "../components/barcode/barcode";
import { EditPage } from "../pages/edit/edit";
import { BarcodeDataService } from "../components/barcode/barcode.data.service";
import { ElasticModule } from 'angular2-elastic';
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { AddCustomPage } from "../pages/add.custom/add";
import { CardNumberComponent } from "../components/card-number/card.Number";
import { CommentComponent } from "../components/comment/comment";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    AddCustomPage,
    EditPage,
    CardTypeModal,
    BarcodeComponent,
    CommentComponent,
    CardNumberComponent
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
    ElasticModule,
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    AddCustomPage,
    EditPage,
    CardTypeModal,
    BarcodeComponent,
    CommentComponent,
    CardNumberComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, BarcodeScanner, CardService, StatusBar, SplashScreen, BarcodeScannerService, BarcodeFormatMapper, BarcodeDataService]
})

export class AppModule { }
