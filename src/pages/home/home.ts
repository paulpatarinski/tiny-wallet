import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CardTypeModal } from "../card-type-modal/card-type";
import { Card } from "../../models/card";
import { CardService } from "../../services/card.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Array<Card>;

  constructor(public modalCtrl: ModalController, public cardService: CardService) {
  }

  navToScan() {
    let selectCardTypeModal = this.modalCtrl.create(CardTypeModal);
    selectCardTypeModal.present();
  }

  private loadActivatedCards() {
    this.cardService.getActivatedCards().then((cards) => {
      this.cards = cards;
      console.log(JSON.stringify(cards));
    });
  }

  ionViewWillEnter() {
    return this.loadActivatedCards();
  }
}