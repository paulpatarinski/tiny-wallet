import { Barcode } from "./barcode";

export class Card {
    constructor(barcode: Barcode, name: string, background: string, logoFileName: string, activated: Boolean) {
        this.barcode = barcode;
        this.name = name;
        this.background = background;
        this.logoFileName = logoFileName;
        this.logoFullPath = "assets/card-logos/" + logoFileName + ".svg";
        this.activated = activated;
    }

    barcode: Barcode;
    name: string;
    background: string;
    logoFileName: string;
    logoFullPath: string;
    activated: Boolean;
}  