import { Platform, NavParams, ViewController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { ScanPage } from "../scan/scan";
import { CardService } from "../../services/card.service";
import { Card } from "../../models/card";

@Component({
    templateUrl: 'card-type.html'
})

export class CardTypeModal {
    cards: Array<Card>;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public cardService: CardService
    ) {

    }

    private loadNonActivatedCards() {
        this.cardService.getNonActivatedCards().then((cards) => {
            this.cards = cards;
            console.log(JSON.stringify(cards));
        });
    }

    ionViewWillEnter() {
        this.loadNonActivatedCards();
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