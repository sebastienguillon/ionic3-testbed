import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { repeat } from 'rxjs/operators/repeat';

import { of } from 'rxjs/observable/of';

import { Observable } from 'rxjs/observable';

@IonicPage()
@Component({
  selector: 'page-click',
  templateUrl: 'click.html',
})
export class ClickPage {

  constructor(
    private navCtrl: NavController
  ) {
    console.log('ClickPage.constructor()');
  }

  ionViewDidLoad() {
    console.log('ClickPage.ionViewDidLoad()');
  }

  clickHandler($event): void {
    console.log('ClickPage.clickHandler(), $event:', $event);
  }

  clickPush($event): void {
    console.log('ClickPage.clickPush(), $event:', $event);
    this.navCtrl.push('FocusPage')
    .catch(err => {
      throw(new Error(`Failed to push to 'FocusPage'`));
    });
  }

  clickPushMultiple($event): void {
    console.log('ClickPage.clickPushMultiple(), $event:', $event);
    for (let i = 0; i < 3; i++) {
      this.clickPush($event);
    }
  }
}
