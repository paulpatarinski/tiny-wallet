import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerService } from "../../services/barcode.scanner.service";
import JsBarcode from 'jsbarcode';

@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html'
})
export class ScanPage {
    card = {
        cardNumber: ""
    };

    private barcodeOptions = null;

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService) {
    }

    ionViewWillEnter() {
        this.scanBarcode();
    }

    scanBarcode() {
        this.barcodeService.scanBarcode()
            .then((barcodeData) => {
                this.barcodeOptions = barcodeData.options;
                this.card.cardNumber = barcodeData.text;
                this.generateBarcode(barcodeData.text, barcodeData.options);
            })
            .catch(err => console.log);
    }

    cardNumberChanged(newCardNumber) {
        if (newCardNumber) {
            var defaultBarcodeOptions = {
                format: "UPC",
                flat: true
            };
            var options = this.barcodeOptions || defaultBarcodeOptions;

            this.generateBarcode(newCardNumber, options);
        }
    }

    generateBarcode(text, opt) {
        if (text && opt) {
            try {
                JsBarcode("#barcode", text, opt);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    cancel() {
        this.navCtrl.pop();
    }
}