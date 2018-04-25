import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  PopoverController 
} from 'ionic-angular';

import { AuthGuard } from '../../auth/auth.guard';
import { AppointmentCoreProvider } from '../../../providers/appointment/core.service';

import { Appointment } from '../../../models/book';
import { APPOINTMENT_DETAIT_PAGE } from '../../page-ref';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { sortPopoverPage } from './popover';
import * as moment from 'moment'

@IonicPage()
@Component({
  selector: 'page-appointment-list',
  templateUrl: 'appointment-list.html',
})
export class AppointmentListPage {
  public books$: Observable<Appointment>
  private book: Appointment
  private _stop$ = new Subject<any>()

  clicked: boolean = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private guard: AuthGuard,
    private appointmentService: AppointmentCoreProvider,
    public popoverCtrl: PopoverController
  ) { }

  ionViewDidLoad() {
    this.init()
    console.log(moment("2018-04-29T06:28:00+07:00").locale("Th").fromNow())
  }

  ionViewCanEnter(): boolean {
   return this.guard.isLoggedIn
  }

  ionViewDidLeave() {
   this._stop$.next()
   this._stop$.complete()
  }

  init() {
    console.log(this.guard.currentUserId)
    this.books$ = this.appointmentService.getAppointmentByUserId(this.guard.currentUserId)
    this.books$.pipe(takeUntil(this._stop$))
      .subscribe(books => {
        this.book = books
        console.log(books)
      })
  }

  onDetail(item: Appointment) {
    console.log(item)
    return this.navCtrl.push(APPOINTMENT_DETAIT_PAGE, {data: item})
      .then(res => (res) ? console.log('OK'): console.log('[status 401]'))
      .catch(err => console.log(err))
  }

  sort(action) {
    this.books$ = this.appointmentService.sortByAction(this.books$, '')
  }

  clickMe() {
    return this.clicked = !this.clicked
  }

}
