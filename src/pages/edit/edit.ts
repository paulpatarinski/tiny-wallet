import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerService } from "../../services/barcode.scanner.service";
import { Card } from "../../models/card";
import { CardService } from "../../services/card.service";
import { Barcode } from "../../models/barcode";
import { BarcodeSize } from "../../models/barcode.size";

@Component({
    selector: 'page-edit',
    templateUrl: 'edit.html'
})
export class EditPage {
    card: Card;
    cardNumber: string;
    barcodeOptions;
    size: BarcodeSize = BarcodeSize.Large;

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService, public cardService: CardService) {
        this.card = params.data.selectedCard;

        if (this.card && this.card.barcode && this.card.barcode.number) {
            this.cardNumber = this.card.barcode.number;
            this.barcodeOptions = this.card.barcode.options;
        }
    }

    scanBarcode() {
        this.barcodeService.scanBarcode()
            .then((barcodeData) => {
                this.cardNumber = barcodeData.text;
                this.barcodeOptions = barcodeData.options;
            })
            .catch(err => console.log);
    }

    cardNumberChanged(newCardNumber) {
        this.cardNumber = newCardNumber;
    }

    save(existingCard: Card, newCardNumber: string, newBarcodeOptions) {
        var newBarcode = new Barcode(newCardNumber, newBarcodeOptions);

        this.cardService.update(existingCard.id, newBarcode).then((updatedCard) => {
            this.card = updatedCard;
        }).then(() => {
            this.navCtrl.pop();
        });
    }

    cancel() {
        this.navCtrl.pop();
    }
}