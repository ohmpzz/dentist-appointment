import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import { CustomerId } from '../../../models/patient';
import { Service } from '../../../models/service';
import { Book } from '../../../models/book';
import * as moment from 'moment'

import { AuthGuard } from '../../auth/auth.guard';
import { BookingCoreProvider } from '../../../providers/booking/core.service';
import { take } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-book-form',
  templateUrl: 'book-form.html',
})
export class BookFormPage {
  private _userInfo: CustomerId
  service: Service
  bookForm: FormGroup
  providerOption = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private guard: AuthGuard,
    private bookService: BookingCoreProvider
  ) {
    this.init()
  }

  ionViewCanEnter() {
    console.log(this.navParams.get('data'))
   return !!this.navParams.get('data') && this.guard.isLoggedIn
  }

  ionViewDidEnter() {
    this.service = this.navParams.get('data')
    this.initUserInfo(this.guard.currentUserId)
    console.log(moment('2018-04-19', 'YYYY-MM-DD').format())
  }

  addBook() {
    if(this.bookForm.invalid) {
      // msg ..
      return false
    }
    const book: Book = {
      cost: this.bookForm.get('cost').value,
      service: this.service.name,
      status: 'รอยืนยัน',
      provider: this.bookForm.get('provider').value,
      duration: this.service.duration,
      datetime: {
        date: this.getDateTime(),
        start_time: this.getStartTime(),
        end_time: this.getEndTime(this.service.duration)
      },
      customer: {
        customerId: this._userInfo.id,
        name: this._userInfo.fullname,
        birthday: this._userInfo.birthday,
        phone: this._userInfo.phoneNumber,
        address: this._userInfo.address
      }
    }
    this.bookService.addBooking(book)
      .then(res => {
        console.log(res)
      })
      .catch((err) => console.log(err))

  }

  getDateTime() {
    const t = this.bookForm.get('datetime.date').value
    return moment(t, 'YYYY-MM-DD').format()
  }

  getStartTime() {
    const t = `${this.bookForm.get('datetime.date').value} ${this.bookForm.get('datetime.start_time').value}`
    return moment(t).format()
  }

  getEndTime(duration) {
    const t = this.getStartTime()
    return moment(t).add(duration, 'm').format()
  }

  pickPrice(type) {
    return this.bookForm.patchValue({cost: this.service.price[type]})
  }

  init() {
    this.initForm()
    this.initProviderSelect(this.navParams.get('data'))
  }

  initForm() {
    this.bookForm = this.fb.group({
      cost: '',
      creationTime: null,
      customer: this.fb.group({
        name: '',
        birthday: '',
        phone: '',
        address: ''
      }),
      datetime: this.fb.group({
        date: '',
        start_time: '',
        end_time: ''
      }),
      provider: this.fb.group({
        providerId: null,
        name: null,
        providerType: ''
      }),
      status: 'รอยืนยัน'
    })

  }

  initUserInfo(uid) {
    this.bookService.getUserById(uid)
      .pipe(take(1))
      .subscribe(user => {
        this._userInfo = user
      })
  }

  initProviderSelect(service: Service) {
    for(let item in service.canProvide) {
      if(service.canProvide[item] && item == 'student') { this.providerOption.push({type: 'นักศึกษา', val: 'student'}) }
      if(service.canProvide[item] && item == 'dentist') { this.providerOption.push({type: 'หมอ', val: 'dentist'}) }
    }

    console.log(this.providerOption)
  }

}
