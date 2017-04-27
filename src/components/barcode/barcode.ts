import { Component, ViewChild, ElementRef, Input } from "@angular/core";
import JsBarcode from 'jsbarcode';
import { BarcodeSize } from "../../models/barcode.size";
import { BarcodeDataService } from "./barcode.data.service";
import { Barcode } from "../../models/barcode";

@Component({
    selector: 'barcode',
    templateUrl: 'barcode.html'
})

export class BarcodeComponent {
    @ViewChild('barcode') barcodeElm: ElementRef;
    @Input() size: BarcodeSize;
    @Input() barcode: Barcode;
    validCardNumber: boolean = false;
    private defaultBarcodeOptions = {
        format: "UPC",
        flat: true
    };

    constructor(public dataService: BarcodeDataService) {

    }

    ngOnChanges(changes: any) {
        try {
            if (!this.barcode || !this.barcode.number) {
                this.dataService.validCardNumber = false;
                this.validCardNumber = false;
                return;
            }

            if (!this.barcode.options) {
                this.barcode.options = this.defaultBarcodeOptions;
            }

            switch (this.size) {
                case BarcodeSize.Large:
                    {
                        this.barcode.options.height = 200;
                        this.barcode.options.width = 4;
                        break;
                    }

                case BarcodeSize.Medium:
                    {
                        this.barcode.options.height = 130;
                        this.barcode.options.width = 5;
                        break;
                    }

                default:
                    {
                        this.barcode.options.height = 130;
                        this.barcode.options.width = 5;
                        break;
                    }
            }

            JsBarcode(this.barcodeElm.nativeElement, this.barcode.number, this.barcode.options);
            this.dataService.validCardNumber = true;
            this.validCardNumber = true;
        }
        catch (err) {
            console.log(err);
            this.dataService.validCardNumber = false;
            this.validCardNumber = false;
        }
    }
}