import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { Storage } from '@ionic/storage';

@Injectable()
export class CardService {
    private _storage: Storage;

    constructor(public strg: Storage) {
        this._storage = strg;
    }

    private populateDefaultCardsIfNull(existingCards) {
        var defaultCards: Array<Card> = new Array<Card>();

        defaultCards.push(new Card(
            null,
            "Target",
            "#cc0005",
            "target",
            true
        ));

        defaultCards.push(new Card(
            null,
            "Adidas",
            "#cc0005",
            "adidas",
            false
        ));

        defaultCards.push(new Card(
            null,
            "Canon",
            "#FFFFFF",
            "canon",
            true
        ));

        defaultCards.push(new Card(
            null,
            "Citi",
            "#cc0005",
            "citi",
            true
        ));

        defaultCards.push(new Card(
            null,
            "Costco",
            "#cc0005",
            "costco",
            true
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