import { Component, ViewChild, ElementRef, Input } from "@angular/core";
import JsBarcode from 'jsbarcode';

@Component({
    selector: 'barcode',
    templateUrl: 'barcode.html'
})

export class BarcodeComponent {
    @ViewChild('barcode') barcode: ElementRef;
    @Input() barcodeNumber;
    @Input() options;
    validCardNumber: Boolean;

    ngOnChanges(changes: any) {
        try {
            if (!this.barcodeNumber || !this.options) {
                this.validCardNumber = false;
                return;
            }

            JsBarcode(this.barcode.nativeElement, this.barcodeNumber, this.options);
            this.validCardNumber = true;
        }
        catch (err) {
            console.log(err);
            this.validCardNumber = false;
        }
    }
}