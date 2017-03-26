import { Injectable } from '@angular/core';

@Injectable()
export class BarcodeFormatMapper {
    constructor() { }

    //Maps between the Scanner format codes & the generator codes
    mapToGeneratorFormat(scannerFormat) {
        var defaultFormat = "ean13";

        if (!scannerFormat)
            return defaultFormat;

        switch (scannerFormat) {
            //Code mappings as listed here : https://github.com/phonegap/phonegap-plugin-barcodescanner
            //& here https://github.com/lindell/JsBarcode
            case "UPC_A":
                return "UPC";
            case "UPC_E":
                return "UPC";
            case "EAN_8":
                return "EAN8";
            case "EAN_13":
                return "ean13";
            case "CODE_128":
                return "CODE128";
            case "CODE_39":
                return "CODE39";
            case "CODE_39":
                return "CODE39";
            //Code 93 is UNSUPPORTED in the Generator...fallback to default
            case "CODE_93":
                return defaultFormat;
            case "CODABAR":
                return "codabar";
            case "ITF":
                return "ITF14";
            case "ITF":
                return "ITF14";
            //RSS14 is UNSUPPORTED in the Generator...fallback to default
            case "RSS14":
                return defaultFormat;
            //RSS_EXPANDED is UNSUPPORTED in the Generator...fallback to default
            case "RSS_EXPANDED":
                return defaultFormat;
            default: {
                alert("Unsupported barcode format: " + scannerFormat);
                return defaultFormat;
            }
        }
    }
}  