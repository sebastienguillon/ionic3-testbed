// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

@Injectable()
export class SgErrorHandler implements IonicErrorHandler {

  constructor() {
    console.log('SgErrorHandler - constructor()');
  }

  handleError(error: Error) {
    console.error('Error caught by SgErrorHandler:', error);
  }
}
