import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BarcodeFormatMapper } from "./barcode.format.mapper";
import { Platform, LoadingController } from "ionic-angular";
import { FabricService } from "./fabric";

@Injectable()
export class BarcodeScannerService {
    private scanningOptions = {
        showTorchButton: true,
        showFlipCameraButton: true,
        disableSuccessBeep: true,
        prompt: "Place a barcode inside the scan area",
        resultDisplayDuration: 0
    };

    constructor(public formatMapper: BarcodeFormatMapper, public platform: Platform, public loadingCtrl: LoadingController, public barcodeScanner: BarcodeScanner, public fabric: FabricService) { }

    scanBarcode(): Promise<any> {
        let loading = this.loadingCtrl.create({
            content: 'Launching Scanner...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 600);

        return this.barcodeScanner.scan(this.scanningOptions)
            .then((barcodeData) => {
                if (!barcodeData || !barcodeData.text)
                    throw 'Unable to scan barcode';

                return this.mapBarcodeData(barcodeData);
            }, (err) => {
                this.fabric.logError(err);
            });
    }

    private mapBarcodeData(scannedBarcodeData) {
        var generatorFormat = this.formatMapper.mapToGeneratorFormat(scannedBarcodeData.format);
        var text = scannedBarcodeData.text;

        //This is hack to handle this bug on iOS : https://github.com/phonegap/phonegap-plugin-barcodescanner/pull/338
        if (this.platform.is('ios') && generatorFormat === "UPC" && text) {
            text = this.removeLeadingZeroIfExists(text);
        }

        return {
            text: text,
            options: {
                format: generatorFormat,
                flat: this.isFlatBarcode(generatorFormat)
            }
        };
    }

    private removeLeadingZeroIfExists(text) {
        if (text.substring(0, 1) == '0') {
            return text.substring(1);
        }

        return text;
    }

    private isFlatBarcode(format) {
        return format === "UPC";
    }
}  