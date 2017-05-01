import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BarcodeScannerService } from "../../services/barcode.scanner.service";
import { BarcodeDataService } from "../../components/barcode/barcode.data.service";

@Component({
    selector: 'card-number',
    templateUrl: 'card.number.html'
})

export class CardNumberComponent {
    @Input() num: string;
    @Output() numChange: EventEmitter<String> = new EventEmitter<String>();
    @Input() barcodeOptions;
    @Output() barcodeOptionsChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(public barcodeScannerService: BarcodeScannerService, public dataService: BarcodeDataService) {
    }

    isValid() {
        return this.dataService.validCardNumber;
    }

    scanBarcode() {
        this.barcodeScannerService.scanBarcode()
            .then((barcodeData) => {
                this.num = barcodeData.text;
                this.numChange.emit(this.num);
                this.barcodeOptions = barcodeData.options;
                this.barcodeOptionsChange.emit(this.barcodeOptions);
            })
            .catch(err => console.log);
    }
}