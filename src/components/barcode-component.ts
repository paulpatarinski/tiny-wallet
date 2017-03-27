import { Component, ViewChild, ElementRef, Input } from "@angular/core";
import JsBarcode from 'jsbarcode';

@Component({
    selector: 'barcode',
    template: `<svg #barcode id="barcode"></svg>`
})

export class BarcodeComponent {
    @ViewChild('barcode') barcode: ElementRef;
    @Input() barcodeNumber;

    ngAfterViewInit() {
        JsBarcode(this.barcode.nativeElement, this.barcodeNumber, {
            height: 50,
            width: 3
        });
    }
}