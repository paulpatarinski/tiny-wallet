import { Barcode } from "./barcode";
import { UUID } from 'angular2-uuid';

export class Card {
    constructor(barcode: Barcode, name: string, background: string, logoFileName: string, activated: Boolean) {
        this.id = UUID.UUID();
        this.barcode = barcode;
        this.name = name;
        this.background = background;
        this.logoFileName = logoFileName;
        this.logoFullPath = "assets/card-logos/" + logoFileName + ".svg";
        this.activated = activated;
    }

    id: string;
    barcode: Barcode;
    name: string;
    background: string;
    logoFileName: string;
    logoFullPath: string;
    activated: Boolean;
}  