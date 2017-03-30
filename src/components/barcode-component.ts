import { Component, ViewChild, ElementRef, Input } from "@angular/core";
import JsBarcode from 'jsbarcode';

@Component({
    selector: 'barcode',
    templateUrl: 'barcode-component.html'
})

export class BarcodeComponent {
    @ViewChild('barcode') barcode: ElementRef;
    @Input() barcodeNumber;
    @Input() height;
    @Input() width;

    validCardNumber: Boolean;

    // ngAfterViewInit() {
    //     try {
    //         JsBarcode(this.barcode.nativeElement, this.barcodeNumber, {
    //             height: 130,
    //             width: 5
    //         });
    //         this.validCardNumber = true;
    //     }
    //     catch (err) {
    //         console.log(err);
    //         this.validCardNumber = false;
    //     }
    // }

    ngOnChanges(changes: any) {
        try {
            JsBarcode(this.barcode.nativeElement, this.barcodeNumber, {
                height: this.height,
                width: this.width,
            });
            this.validCardNumber = true;
        }
        catch (err) {
            console.log(err);
            this.validCardNumber = false;
        }
    }
}