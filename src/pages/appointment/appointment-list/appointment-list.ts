import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthGuard } from '../../auth/auth.guard';
import { Observable } from '@firebase/util';


@IonicPage()
@Component({
  selector: 'page-appointment-list',
  templateUrl: 'appointment-list.html',
})
export class AppointmentListPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private guard: AuthGuard
  ) {
    console.log(this.guard.isLoggedIn)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentListPage');
    console.log('logged in')
  }

  ionViewCanEnter(): boolean {
   return this.guard.isLoggedIn
  }

}
