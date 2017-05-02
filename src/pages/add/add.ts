import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerService } from "../../services/barcode.scanner.service";
import { Card } from "../../models/card";
import { BarcodeSize } from "../../models/barcode.size";
import { Barcode } from "../../models/barcode";
import { CardService } from "../../services/card.service";
import { BarcodeDataService } from "../../components/barcode/barcode.data.service";

@Component({
    selector: 'page-add',
    templateUrl: 'add.html'
})
export class AddPage {
    card: Card;
    cardNumber: string;
    comment: string;
    size: BarcodeSize = BarcodeSize.Large;
    barcodeOptions = null;

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService, public cardService: CardService, public dataService: BarcodeDataService) {
        this.card = params.data.selectedCard;
    }

    ionViewWillEnter() {
        this.scanBarcode();
    }

    scanBarcode() {
        this.barcodeService.scanBarcode()
            .then((barcodeData) => {
                this.cardNumber = barcodeData.text;
                this.barcodeOptions = barcodeData.options;
            })
            .catch(err => console.log);
    }

    canSave() {
        return this.cardNumber;
    }

    save(existingCard: Card, newCardNumber: string, comment: string, newBarcodeOptions) {
        var newBarcode = new Barcode(newCardNumber, newBarcodeOptions);

        this.cardService.update(existingCard.id, comment, newBarcode).then((updatedCard) => {
            this.card = updatedCard;
        }).then(() => {
            this.navCtrl.pop();
        });
    }

    cancel() {
        return this.navCtrl.pop();
    }
}