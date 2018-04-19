import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { AuthProvider } from '../auth.service';
import { APPOINTMENT_LIST_PAGE } from '../../page-ref';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  profileForm: FormGroup
  uid: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private authService: AuthProvider
  ) {
    this.init()    
  }

  ionViewDidLoad() {
    this.uid = this.navParams.get('uid')
  }

  ionViewCanEnter():boolean {
    if(!this.navParams.get('uid')) {
      return false
    } else {
      return true
    }
  }

  init() {
    this.profileForm = this.fb.group({
      fullname: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      birthday: [null, Validators.required],
      address: '',
      firstname: null,
      lastname: null
    })
  }

  add() {
    if(this.profileForm.invalid) return false
    const fullname: string = this.profileForm.get('fullname').value
    const firstname = (fullname.indexOf(' ') != -1)? fullname.substring(0, fullname.indexOf(' '))
    : fullname.substring(0, fullname.length)
    const lastname = (fullname.indexOf(' ') != -1)? fullname.substring(Number(fullname.indexOf(' ')) + 1 , fullname.length)
    : null

    this.profileForm.patchValue({
      firstname: firstname,
      lastname: lastname,
      birthday: moment(this.profileForm.get('birthday').value).format()
    })

    this.authService.updateUser(this.uid, this.profileForm.value)
      .then(() => {
        this.navCtrl.setRoot(APPOINTMENT_LIST_PAGE)
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

}
