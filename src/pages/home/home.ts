import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { CardTypeModal } from "../card-type-modal/card-type";
import { Card } from "../../models/card";
import { CardService } from "../../services/card.service";
import { ScanPage } from "../scan/scan";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Array<Card>;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public cardService: CardService) {
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

  navToDetails(selectedCard: Card) {
    var params = {
      autoLaunchScan: false,
      selectedCard: selectedCard
    };

    this.navCtrl.push(ScanPage, params);
  }

  ionViewWillEnter() {
    return this.loadActivatedCards();
  }
}