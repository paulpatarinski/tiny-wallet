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
    private _allCards: Array<Card>;

    constructor(public strg: Storage, public loadingCtrl: LoadingController, public http: Http) {
        this._storage = strg;
    }

    private populateDefaultCardsIfNull(existingCards): Promise<Array<Card>> {
        if (!existingCards) {
            return this.parseDefaultCardsFromJson()
                .then((dtos) => {
                    return this.mapDTOs(dtos);
                })
                .then((cards) => {
                    return this.saveCards(cards);
                });
        }

        var existingCardsParsed = JSON.parse(existingCards);

        return this.parseDefaultCardsFromJson()
            .then((cardsFromJson) => {
                if (this.newCardsAdded(cardsFromJson, existingCardsParsed)) {
                    var newCards = this.getNewCards(cardsFromJson, existingCardsParsed);
                    var mergedCardArray = existingCardsParsed.concat(newCards);

                    return this.saveCards(mergedCardArray);
                }

                return existingCardsParsed;
            });
    }

    private newCardsAdded(newCards: Array<CardDTO>, existingCards: Array<Card>): boolean {
        return newCards.length > existingCards.length;
    }

    private getNewCards(cardsFromJson: Array<CardDTO>, existingCards: Array<Card>): Array<Card> {
        var newCards = new Array<Card>();

        cardsFromJson.forEach((dto) => {
            //Card by that name does not exist
            if (!(existingCards.find(crd => crd.name === dto.name))) {
                newCards.push(this.mapDTO(dto));
            }
        });

        return newCards;
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
        return new Promise((resolve, reject) => {
            if (this._allCards) {
                resolve(this._allCards);
            } else {
                this._storage.ready().then(() => {
                    return this._storage.get('cards');
                }).then((existingCards) => {
                    return this.populateDefaultCardsIfNull(existingCards);
                }).then((allCards) => {
                    this._allCards = allCards;
                    return resolve(this._allCards);
                });
            }
        });
    }

    private saveAllCards(cards: Array<Card>): Promise<Array<Card>> {
        return this._storage.ready().then(() => {
            return this._storage.set('cards', JSON.stringify(cards)).then((result) => {
                return result;
            });
        }).then((result) => {
            //Update in memory storage
            this._allCards = cards;
            return this._allCards;
        });
    }

    private filterActivated(allCards: Array<Card>): Array<Card> {
        return allCards.filter(c => c.activated);
    }

    private filterNonActivated(allCards: Array<Card>): Array<Card> {
        return allCards.filter(c => !c.activated);
    }

    private filterCustomCards(cards: Array<Card>) {
        if (!cards)
            return null;

        return cards.filter(c => c.isCustomCard);
    }

    private getDefaultCustomCard(): Card {
        var defaultBackground = "#CCCCCC";
        var defaultLogoFileName = "custom-card";
        var customCard = new Card(null, "Custom Card", "", defaultBackground, defaultLogoFileName, false);

        customCard.isCustomCard = true;

        return customCard;
    }

    private addCustomCardOption(nonActivatedCards: Array<Card>) {
        var customCards = this.filterCustomCards(nonActivatedCards);

        if (!customCards || customCards.length === 0) {
            nonActivatedCards.unshift(this.getDefaultCustomCard());
        }

        return nonActivatedCards;
    }

    getActivatedCards(): Promise<Array<Card>> {
        return this.getAllCards().then((cards) => {
            return this.filterActivated(cards);
        });
    }

    getNonActivatedCards(): Promise<Array<Card>> {
        return this.getAllCards()
            .then((cards) => { return this.filterNonActivated(cards); })
            .then((nonActivatedCards) => { return this.addCustomCardOption(nonActivatedCards) });
    }

    add(card: Card): Promise<Card> {
        let loading = this.loadingCtrl.create({
            content: 'Saving...'
        });

        loading.present();

        return this.getAllCards().then((cards) => {
            card.activated = true;

            cards.push(card);

            return this.saveAllCards(cards).then(() => {
                return card;
            }).then((card) => {
                loading.dismiss();
                return card;
            }).catch((err) => {
                console.log('Error Saving' + err);
                loading.dismiss();
            });
        });

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

            cardToDelete.barcode = new Barcode(null, null);
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