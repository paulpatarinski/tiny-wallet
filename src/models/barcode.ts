export class Barcode {
    constructor(number: string, format: string) {
        this.number = number;
        this.format = format;
        this.options = {
            format: this.format,
            flat: true
        };
    }

    number: string;
    format: string;
    options: any;
}  