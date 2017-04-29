import { Barcode } from "./barcode";
import { UUID } from 'angular2-uuid';

export class Card {
    constructor(barcode: Barcode, name: string, comment: string, background: string, logoFileName: string, activated: Boolean) {
        this.id = UUID.UUID();
        this.barcode = barcode;
        this.name = name;
        this.comment = comment;
        this.background = background;
        this.logoFullPath = "assets/card-logos/" + logoFileName + ".svg";
        this.activated = activated;
        this.isCustomCard = false;
    }

    id: string;
    barcode: Barcode;
    name: string;
    comment: string;
    background: string;
    logoFullPath: string;
    activated: Boolean;
    isCustomCard: Boolean;
}  