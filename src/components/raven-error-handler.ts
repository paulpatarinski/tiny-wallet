import * as Raven from 'raven-js';
import { ErrorHandler } from '@angular/core';

export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        Raven.captureException(err.originalError || err);
    }
}