import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthGuard } from '../../auth/auth.guard';

import { Appointment } from '../../../models/book';

@IonicPage()
@Component({
  selector: 'page-appointment-detail',
  templateUrl: 'appointment-detail.html',
})
export class AppointmentDetailPage {
  appointmentInfo: Appointment

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private guard: AuthGuard
  ) {
  }

  ionViewDidLoad() {
    console.log('[Appointment Detail]')
    this.appointmentInfo = this.navParams.get('data')
  }

  ionViewCanEnter() {
   return this.guard.isLoggedIn && !!this.navParams.get('data')
  }

}
