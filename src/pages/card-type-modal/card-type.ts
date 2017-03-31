import { Platform, NavParams, ViewController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { ScanPage } from "../scan/scan";
import { CardService } from "../../services/card.service";
import { Card } from "../../models/card";

@Component({
    selector: 'cart-type-modal',
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
        return this.loadNonActivatedCards();
    }

    cardSelected(selectedCard: Card) {
        var params = {
            autoLaunchScan: true,
            selectedCard: selectedCard
        };

        this.navCtrl.push(ScanPage, params).then(() => {
            this.viewCtrl.dismiss();
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}