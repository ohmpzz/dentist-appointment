import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../pages/auth/auth.service';
import { AuthGuard } from '../pages/auth/auth.guard';
import { 
  APPOINTMENT_LIST_PAGE, 
  PHONE_LOGIN_PAGE,
  ADD_BOOK 
} from '../pages/page-ref';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private auth: AuthProvider,
    private guard: AuthGuard
  ) {
    this.initializeApp();

    this.guard.authState$.subscribe(auth => {
      this.guard.setAuthen = auth
      if(auth) {
        this.rootPage = APPOINTMENT_LIST_PAGE
      } else {
        this.rootPage = PHONE_LOGIN_PAGE
      }
    })
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'รายการนัดหมาย', component: APPOINTMENT_LIST_PAGE },
      { title: 'นัดหมาย', component: ADD_BOOK}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    this.auth.signOut()
      .then(() => {
        this.nav.setRoot(PHONE_LOGIN_PAGE)
          .then(() => console.log('setRoot: PHONE_LOGIN_PAGE from MyApp'))
          .catch((err) => console.log('MyApp navCtrl err: ', err))
      })
      .catch((err) => console.log('My App fn signOut error: ', err))
  }
}
