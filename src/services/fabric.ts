import { Injectable } from '@angular/core';

@Injectable()
export class FabricService {
    constructor() { }

    sendCustomEvent(name: string, attributes: object) {
        if (!(<any>window).fabric) {
            console.log("Fabric plugin is not enabled using console log instead");
            console.log("Name " + name + " attributes : " + JSON.stringify(attributes));
            return;
        }

        (<any>window).fabric.Answers.sendCustomEvent(name, attributes);
    }

    logError(err) {
        if (!(<any>window).fabric) {
            console.log("Fabric plugin is not enabled using console log instead");
            console.log("Error => " + err);
            return;
        }

        (<any>window).fabric.Crashlytics.sendNonFatalCrash(err);
    }
}  