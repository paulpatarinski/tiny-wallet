import { Component, ViewChild, ElementRef, Input } from "@angular/core";
import JsBarcode from 'jsbarcode';
import { BarcodeSize } from "../../models/barcode.size";
import { BarcodeDataService } from "./barcode.data.service";

@Component({
    selector: 'barcode',
    templateUrl: 'barcode.html'
})

export class BarcodeComponent {
    @ViewChild('barcode') barcode: ElementRef;
    @Input() barcodeNumber: string;
    @Input() size: BarcodeSize;
    @Input() options;
    validCardNumber: boolean = false;
    /**
     *
     */
    constructor(public dataService: BarcodeDataService) {

    }

    ngOnChanges(changes: any) {
        try {
            if (!this.barcodeNumber || !this.options) {
                this.dataService.validCardNumber = false;
                this.validCardNumber = false;
                return;
            }

            switch (this.size) {
                case BarcodeSize.Large:
                    {
                        this.options.height = 200;
                        this.options.width = 4;
                        break;
                    }

                case BarcodeSize.Medium:
                    {
                        this.options.height = 130;
                        this.options.width = 5;
                        break;
                    }

                default:
                    {
                        this.options.height = 130;
                        this.options.width = 5;
                        break;
                    }
            }

            JsBarcode(this.barcode.nativeElement, this.barcodeNumber, this.options);
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