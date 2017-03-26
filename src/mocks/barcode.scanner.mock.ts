import { BarcodeScanner } from "@ionic-native/barcode-scanner";

export class BarcodeScannerMock extends BarcodeScanner {
    scan(options) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    text: "12355435532",
                    format: "UPC_A"
                });
            }, 1000);
        })
    }
}