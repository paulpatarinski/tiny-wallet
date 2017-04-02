import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerService } from "../../services/barcode.scanner.service";
import { Card } from "../../models/card";

@Component({
    selector: 'page-add',
    templateUrl: 'add.html'
})
export class AddPage {
    card: Card;
    cardNumber: string;
    barcodeOptions = null;
    private autoLaunchScan: Boolean;

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService) {
        this.card = params.data.selectedCard;
        this.autoLaunchScan = params.data.autoLaunchScan;

        if (this.card && this.card.barcode && this.card.barcode.number) {
            this.cardNumber = this.card.barcode.number;
            var modifiedOptions = this.card.barcode.options;

            modifiedOptions.height = 200;
            modifiedOptions.width = 4;

            this.barcodeOptions = modifiedOptions;
        }
    }

    ionViewWillEnter() {
        if (this.autoLaunchScan) {
            this.scanBarcode();
        }
    }

    scanBarcode() {
        this.barcodeService.scanBarcode()
            .then((barcodeData) => {
                this.barcodeOptions = barcodeData.options;
                this.cardNumber = barcodeData.text;
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
            this.cardNumber = text;
            this.barcodeOptions = opt;
        }
    }

    save() {
        //todo: do an actual save
        this.navCtrl.pop();
    }

    cancel() {
        this.navCtrl.pop();
    }
}