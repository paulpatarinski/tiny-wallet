import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { Storage } from '@ionic/storage';
import { Barcode } from "../models/barcode";
import { LoadingController } from "ionic-angular";

@Injectable()
export class CardService {
    private _storage: Storage;

    constructor(public strg: Storage, public loadingCtrl: LoadingController) {
        this._storage = strg;
    }

    private populateDefaultCardsIfNull(existingCards) {
        var defaultCards: Array<Card> = new Array<Card>();

        defaultCards.push(new Card(
            null,
            "Target",
            "#cc0005",
            "target",
            false
        ));

        defaultCards.push(new Card(
            null,
            "Canon",
            "#FFFFFF",
            "canon",
            false
        ));

        defaultCards.push(new Card(
            null,
            "Citi",
            "#CCCCCC",
            "citi",
            false
        ));

        defaultCards.push(new Card(
            null,
            "Costco",
            "#303030",
            "costco",
            false
        ));


        defaultCards.push(new Card(
            null,
            "Adidas",
            "#cc0005",
            "adidas",
            false
        ));


        if (!existingCards) {
            this._storage.set('cards', JSON.stringify(defaultCards));
            return defaultCards;
        }

        return JSON.parse(existingCards);
    }

    private getAllCards(): Promise<Array<Card>> {
        return this._storage.ready().then(() => {
            return this._storage.get('cards');
        }).then((existingCards) => {
            return this.populateDefaultCardsIfNull(existingCards);
        });
    }

    private saveAllCards(cards: Array<Card>): Promise<Array<Card>> {
        return this._storage.ready().then(() => {
            return this._storage.set('cards', JSON.stringify(cards));
        }).then((result) => {
            return cards;
        });
    }

    private filterActivated(allCards: Array<Card>): Array<Card> {
        return allCards.filter(c => c.activated);
    }

    private filterNonActivated(allCards: Array<Card>): Array<Card> {
        return allCards.filter(c => !c.activated);
    }

    getActivatedCards(): Promise<Array<Card>> {
        return this.getAllCards().then(this.filterActivated);
    }

    getNonActivatedCards(): Promise<Array<Card>> {
        return this.getAllCards().then(this.filterNonActivated);
    }

    update(selectedCardId: string, newBarcode: Barcode): Promise<Card> {
        let loading = this.loadingCtrl.create({
            content: 'Saving...'
        });

        loading.present();

        return this.getAllCards().then((cards) => {
            var selectedCard = cards.find(c => c.id === selectedCardId);

            if (!selectedCard)
                return selectedCard;

            selectedCard.barcode = newBarcode;

            if (!selectedCard.activated) {
                selectedCard.activated = true;
            }

            return this.saveAllCards(cards).then(() => {
                return selectedCard;
            }).then((card) => {
                loading.dismiss();
                return card;
            }).catch((err) => {
                console.log('Error Saving' + err);
                loading.dismiss();
            });
        });
    }

    delete(cardId: string): Promise<Card> {
        let loading = this.loadingCtrl.create({
            content: 'Deleting...'
        });

        loading.present();

        return this.getAllCards().then((cards) => {
            var cardToDelete = cards.find(c => c.id === cardId);

            if (!cardToDelete)
                return cardToDelete;

            cardToDelete.barcode = null;
            cardToDelete.activated = false;

            return this.saveAllCards(cards).then(() => {
                return cardToDelete;
            }).then((card) => {
                loading.dismiss();
                return card;
            }).catch((err) => {
                console.log('Error Deleting Card' + err);
                loading.dismiss();
            });
        });
    }
}  