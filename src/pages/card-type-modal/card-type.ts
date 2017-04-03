import { Platform, NavParams, ViewController, App } from "ionic-angular";
import { Component } from "@angular/core";
import { AddPage } from "../add/add";
import { CardService } from "../../services/card.service";
import { Card } from "../../models/card";
import { StatusBar } from "@ionic-native/status-bar";

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
        public appCtrl: App,
        public cardService: CardService,
        public statusBar: StatusBar
    ) {

    }

    private loadNonActivatedCards() {
        return this.cardService.getNonActivatedCards().then((cards) => {
            this.cards = cards;
            console.log(JSON.stringify(cards));
        });
    }

    ionViewWillEnter() {
        this.statusBar.styleDefault();

        return this.loadNonActivatedCards();
    }

    cardSelected(selectedCard: Card) {
        var params = {
            autoLaunchScan: true,
            selectedCard: selectedCard
        };

        return this.appCtrl.getRootNav().push(AddPage, params).then(() => {
            return this.viewCtrl.dismiss();
        });
    }

    dismiss() {
        return this.viewCtrl.dismiss();
    }
}