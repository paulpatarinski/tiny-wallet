import { Platform, NavParams, ViewController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { ScanPage } from "../scan/scan";

@Component({
    templateUrl: 'card-type.html'
})

export class CardTypeModal {
    public availableCards = [
        {
            name: "Target"
        }
    ];

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController
    ) {

    }

    cardSelected(selectedCardType) {
        this.navCtrl.push(ScanPage, selectedCardType).then(() => {
            this.viewCtrl.dismiss();
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}