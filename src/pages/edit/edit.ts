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
    size: BarcodeSize = BarcodeSize.Large;

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService, public cardService: CardService, public dataService: BarcodeDataService, public statusBar: StatusBar) {
        this.card = params.data.selectedCard;
    }

    ionViewWillEnter() {
        this.statusBar.styleDefault();
    }

    scanBarcode() {
        this.barcodeService.scanBarcode()
            .then((barcodeData) => {
                this.card.barcode = new Barcode(barcodeData.text, barcodeData.options);
            })
            .catch(err => console.log);
    }

    save(existingCard: Card, newCardNumber: string, comment: string, newBarcodeOptions) {
        var newBarcode = new Barcode(newCardNumber, newBarcodeOptions);

        return this.cardService.update(existingCard.id, comment, newBarcode).then((updatedCard) => {
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