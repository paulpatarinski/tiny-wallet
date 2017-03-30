export class Barcode {
    constructor(number: string, format: string) {
        this.number = number;
        this.format = format;
        this.options = {
            format: this.format,
            height: 130,
            width: 5,
            flat: true
        };
    }

    number: string;
    format: string;
    options: any;
}  