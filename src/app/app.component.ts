import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: {title: string, component: any}[];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Focus', component: 'FocusPage' },
      { title: 'Click', component: 'ClickPage' },
    ];

  }

  initializeApp() {
    this.platform.ready()
    .then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    })
    .catch(err => {
      throw(new Error('Platform failed to become ready.'));
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component)
    .catch(err => {
      throw(new Error('Unable to setRoot().'));
    });
  }
}
