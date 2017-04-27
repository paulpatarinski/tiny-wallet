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
    size: BarcodeSize = BarcodeSize.Large;
    private autoLaunchScan: Boolean;

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService, public cardService: CardService, public dataService: BarcodeDataService) {
        var selectedCard = params.data.selectedCard;
        selectedCard.barcode = new Barcode(null, null);
        this.card = selectedCard;
        this.autoLaunchScan = params.data.autoLaunchScan;
    }

    ionViewWillEnter() {
        if (this.autoLaunchScan) {
            this.scanBarcode();
        }
    }

    scanBarcode() {
        this.barcodeService.scanBarcode()
            .then((barcodeData) => {
                this.card.barcode = new Barcode(barcodeData.text, barcodeData.options);
            })
            .catch(err => console.log);
    }

    save(existingCard: Card) {
        this.cardService.update(existingCard.id, existingCard.comment, existingCard.barcode).then((updatedCard) => {
            this.card = updatedCard;
        }).then(() => {
            this.navCtrl.pop();
        });
    }

    cancel() {
        return this.navCtrl.pop();
    }
}