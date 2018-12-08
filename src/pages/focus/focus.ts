import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-focus',
  templateUrl: 'focus.html',
})
export class FocusPage implements OnInit {
  @ViewChild('focusMe') focusMe;

  constructor() {
    console.log('FocusPage.constructor()');
  }

  ngOnInit() {
    console.log('FocusPage.ngOnInit()');
    setTimeout(() => {
      this.focusMe.setFocus();
    }, 100);
  }

  ioniViewWillEnter() {
    console.log('FocusPage.ioniViewWillEnter()');
  }

  ioniViewDidLoad() {
    console.log('FocusPage.ionViewDidLoad()');
  }

  ngAfterViewInit() {
    console.log('FocusPage.ngAfterViewInit()');
  }

}
