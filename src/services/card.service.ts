import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { Storage } from '@ionic/storage';
import { Barcode } from "../models/barcode";

@Injectable()
export class CardService {
    private _storage: Storage;

    constructor(public strg: Storage) {
        this._storage = strg;
    }

    private populateDefaultCardsIfNull(existingCards) {
        var defaultCards: Array<Card> = new Array<Card>();

        defaultCards.push(new Card(
            new Barcode("123554355324", "UPC"),
            "Target",
            "#cc0005",
            "target",
            true
        ));

        defaultCards.push(new Card(
            new Barcode("123554355324", "UPC"),
            "Canon",
            "#FFFFFF",
            "canon",
            true
        ));

        defaultCards.push(new Card(
            new Barcode("123554355324", "UPC"),
            "Citi",
            "#CCCCCC",
            "citi",
            true
        ));

        defaultCards.push(new Card(
            new Barcode("123554355324", "UPC"),
            "Costco",
            "#303030",
            "costco",
            true
        ));

        defaultCards.push(new Card(
            new Barcode("123554355324", "UPC"),
            "Adidas",
            "#cc0005",
            "adidas",
            true
        ));

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
}  