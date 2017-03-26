import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CardTypeModal } from "../card-type-modal/card-type";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public modalCtrl: ModalController) {
  }

  navToScan() {
    let selectCardTypeModal = this.modalCtrl.create(CardTypeModal);
    selectCardTypeModal.present();
  }
}