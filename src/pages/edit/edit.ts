import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerService } from "../../services/barcode.scanner.service";
import { Card } from "../../models/card";
import { CardService } from "../../services/card.service";
import { Barcode } from "../../models/barcode";
import { BarcodeSize } from "../../models/barcode.size";
import { BarcodeDataService } from "../../components/barcode/barcode.data.service";
import { StatusBar } from "@ionic-native/status-bar";

@Component({
    selector: 'page-edit',
    templateUrl: 'edit.html'
})
export class EditPage {
    card: Card;
    cardNumber: string;
    comment: string;
    cardName: string;
    size: BarcodeSize = BarcodeSize.Large;
    barcodeOptions = null;

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService, public cardService: CardService, public dataService: BarcodeDataService, public statusBar: StatusBar) {
        this.card = params.data.selectedCard;

        if (this.card && this.card.barcode && this.card.barcode.number) {
            this.cardNumber = this.card.barcode.number;
            this.comment = this.card.comment;
            this.barcodeOptions = this.card.barcode.options;
            this.cardName = this.card.name;
        }
    }

    ionViewWillEnter() {
        this.statusBar.styleDefault();
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
        if (this.card.isCustomCard) {
            return this.cardNumber && this.cardName !== "";
        }

        return this.cardNumber;
    }

    save(existingCard: Card, newCardNumber: string, comment: string, cardName: string, newBarcodeOptions) {
        var newBarcode = new Barcode(newCardNumber, newBarcodeOptions);

        return this.cardService.update(existingCard.id, comment, newBarcode, cardName).then((updatedCard) => {
            this.card = updatedCard;
        }).then(() => {
            this.navCtrl.pop();
        });
    }

    delete(existingCard: Card) {
        return this.cardService.delete(existingCard.id).then(() => {
            this.navCtrl.pop();
        });
    }

    cancel() {
        return this.navCtrl.pop();
    }
}