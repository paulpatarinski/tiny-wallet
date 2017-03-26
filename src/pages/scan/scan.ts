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
        storeName: "",
        accountNumber: ""
    };

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService) {
        this.card.storeName = this.params.data.name;
    }

    ionViewWillEnter() {
        this.scanBarcode();
    }

    scanBarcode() {
        this.barcodeService.scanBarcode()
            .then((barcodeData) => {
                this.card.accountNumber = barcodeData.text;
                this.generateBarcode(barcodeData.text, barcodeData.options);
            })
            .catch(err => console.log);
    }

    accountNumberChanged(accountNumber) {
        if (accountNumber) {
            this.generateBarcode(accountNumber, {
                format: "UPC",
                flat: true
            });
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