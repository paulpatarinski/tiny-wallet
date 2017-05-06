import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerService } from "../../services/barcode.scanner.service";
import { Card } from "../../models/card";
import { BarcodeSize } from "../../models/barcode.size";
import { Barcode } from "../../models/barcode";
import { CardService } from "../../services/card.service";
import { BarcodeDataService } from "../../components/barcode/barcode.data.service";
import { FabricService } from "../../services/fabric";

@Component({
    selector: 'page-add',
    templateUrl: 'add.html'
})
export class AddCustomPage {
    card: Card;
    cardNumber: string;
    cardName: string;
    comment: string;
    size: BarcodeSize = BarcodeSize.Large;
    barcodeOptions = null;

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService, public cardService: CardService, public dataService: BarcodeDataService, public fabric: FabricService) {
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
        return this.cardNumber && this.cardName;
    }

    save(existingCard: Card, newCardNumber: string, comment: string, cardName: string, newBarcodeOptions) {
        var newBarcode = new Barcode(newCardNumber, newBarcodeOptions);

        existingCard.barcode = newBarcode;
        existingCard.comment = comment;
        existingCard.name = cardName;

        this.cardService.saveCustomCard(existingCard).then((updatedCard) => {
            this.card = updatedCard;
        }).then(() => {
            this.fabric.sendCustomEvent("Custom Card Added", { "name": cardName });
        }).then(() => {
            this.navCtrl.pop();
        });
    }

    cancel() {
        return this.navCtrl.pop();
    }
}