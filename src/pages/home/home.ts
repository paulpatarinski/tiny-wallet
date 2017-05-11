import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { CardTypeModal } from "../card-type-modal/card-type";
import { Card } from "../../models/card";
import { CardService } from "../../services/card.service";
import { EditPage } from "../edit/edit";
import { BarcodeSize } from "../../models/barcode.size";
import { StatusBar } from "@ionic-native/status-bar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Array<Card>;
  showCards: boolean = false;
  size: BarcodeSize = BarcodeSize.Medium;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public cardService: CardService, public statusBar: StatusBar) {
  }

  navToAdd() {
    let selectCardTypeModal = this.modalCtrl.create(CardTypeModal);
    selectCardTypeModal.present();
  }

  private loadActivatedCards() {
    this.cardService.getActivatedCards().then((cards) => {
      this.cards = cards;
      this.showCards = cards.length > 0;
      console.log(JSON.stringify(cards));
    });
  }

  navToDetails(selectedCard: Card) {
    var params = {
      autoLaunchScan: false,
      selectedCard: selectedCard
    };

    this.navCtrl.push(EditPage, params);
  }

  ionViewWillEnter() {
    this.statusBar.styleBlackTranslucent();
    return this.loadActivatedCards();
  }
}