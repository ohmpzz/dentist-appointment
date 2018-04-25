import { ServiceId } from './../../../models/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ADD_BOOK_FORM } from '../../page-ref';

import { AuthGuard } from '../../auth/auth.guard';
import { BookingCoreProvider } from '../../../providers/booking/core.service';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-service-list',
  templateUrl: 'service-list.html',
})
export class ServiceListPage {
  serviceItems: any[]
  private _stop$ = new Subject<any>()

  mockData: ServiceId[] = [
    {
    id: '1',
    name: 'test 1',
    price: {
      student: '60',
      dentist: '100'
    },
    duration: '60',
    canProvide: {
      student: true,
      dentist: false
    }
  }
]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private guard: AuthGuard,
    private bookService: BookingCoreProvider
  ) {
    this.init()
  }

  ionViewCanEnter(): boolean {
    return this.guard.isLoggedIn
  }

  ionViewDidLeave() {
    this._stop$.next('stop')
    this._stop$.complete()
  }

  nextStep(data) {
    return this.navCtrl.push(ADD_BOOK_FORM, {data: data})
      .then(res => console.log('OK'))
      /* .catch(err => console.log(err)) */
  }

  init() {
    this.bookService.getServices()
    .pipe(takeUntil(this._stop$))
    .subscribe(res => {
      console.log('Work')
      console.log(res)
      this.serviceItems = res
    })
  }
}
