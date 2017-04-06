import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { Storage } from '@ionic/storage';
import { Barcode } from "../models/barcode";
import { LoadingController } from "ionic-angular";
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CardDTO } from "../models/card.dto";

@Injectable()
export class CardService {
    private _storage: Storage;

    constructor(public strg: Storage, public loadingCtrl: LoadingController, public http: Http) {
        this._storage = strg;
    }

    private populateDefaultCardsIfNull(existingCards): Promise<Array<Card>> {

        return new Promise((resolve, reject) => {
            if (!existingCards) {
                return this.parseDefaultCardsFromJson()
                    .then((dtos) => {
                        return this.mapDTOs(dtos);
                    })
                    .then((cards) => {
                        return this.saveCards(cards);
                    });
            }

            resolve(JSON.parse(existingCards));
        });
    }

    private saveCards(cards: Array<Card>) {
        return this._storage.set('cards', JSON.stringify(cards)).then(() => {
            return cards;
        });
    }

    private mapDTOs(cardDTOs: Array<CardDTO>): Array<Card> {
        return cardDTOs.map((dto) => {
            return this.mapDTO(dto);
        });
    }

    private mapDTO(dto: CardDTO): Card {
        return new Card(null, dto.name, "", dto.background, dto.logoFileName, false);
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

    update(selectedCardId: string, comment: string, newBarcode: Barcode): Promise<Card> {
        let loading = this.loadingCtrl.create({
            content: 'Saving...'
        });

        loading.present();

        return this.getAllCards().then((cards) => {
            var selectedCard = cards.find(c => c.id === selectedCardId);

            if (!selectedCard)
                return selectedCard;

            selectedCard.barcode = newBarcode;
            selectedCard.comment = comment;

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

    private parseDefaultCardsFromJson(): Promise<Array<CardDTO>> {
        return this.http
            .get('assets/data/cards.json')
            .toPromise()
            .then((data) => {
                return data.json();
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