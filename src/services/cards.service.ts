import { Injectable } from "@angular/core";
import { Card } from "../models/card";

@Injectable()
export class CardService {
    private _storage: Storage;

    constructor(public storage: Storage) {
        this._storage = storage;
    }

    private populateDefaultCardsIfNull(existingCards) {
        var defaultCards: Array<Card>;

        defaultCards.push({
            barcode: null,
            name: 'Target',
            activated: false
        });

        if (!existingCards) {
            this._storage.setItem('cards', JSON.stringify(defaultCards));
            return defaultCards;
        }

        return JSON.parse(existingCards);
    }

    private getAllCards(): Promise<Array<Card>> {
        return this._storage.ready().then(() => {
            return this._storage.getItem('cards');
        }).then(this.populateDefaultCardsIfNull);
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