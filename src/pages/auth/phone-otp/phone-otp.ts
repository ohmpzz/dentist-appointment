import { first } from 'rxjs/operators';
import { WindowService, AuthProvider } from './../auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PHONE_USER_PROFILE, APPOINTMENT_LIST_PAGE } from '../../page-ref';

@IonicPage()
@Component({
  selector: 'page-phone-otp',
  template: `
  <ion-header>
    <ion-navbar hideBackButton="false">
      <ion-title>Verify Code</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content padding>
    <form novalidate>
      <ion-list>
        <ion-item>
          <ion-label color="primary" floating>Verify Code</ion-label>
          <ion-input [(ngModel)]="code" name="code"></ion-input>
        </ion-item>
      </ion-list>
      <button ion-button (click)="onVerifier(code)">Verify</button>
    </form>
  </ion-content>
  `
})
export class PhoneOtpPage {
  code: any
  windowRef: any
  email: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private win: WindowService,
    private authService: AuthProvider
  ) {
    const email = this.navParams.get('email')
    this.email = (email) ? email : null
    console.log(this.email)
  }

  ionViewDidLoad() {
    console.log(this.win.windowRef)
    this.windowRef = this.win.windowRef
  }

  onVerifier(code: string) {
    this.windowRef.confirmationResult
      .confirm(code)
      .then(result => {
        console.log(result)
        if(result.additionalUserInfo.isNewUser) {
          console.log('new user')
          const uid = result.user.uid
          const prepare = {
            phoneNumber: result.user.phoneNumber,
            isNewUser: true,
            creationTime: result.user.metadata.creationTime,
            lastSignInTime: result.user.metadata.lastSignInTime,
            email: this.email
          }
          this.authService.addUser(uid, prepare)
          this.navCtrl.push(PHONE_USER_PROFILE, {uid: result.user.uid})
            .catch(err => console.log(err))
        } else {
          // check isNewUser in db
          this.authService.getUserByNumber(result.user.phoneNumber)
            .pipe(first())
            .subscribe(res => {
              console.log(res)
              if(res[0].isNewUser) {
                console.log('this')
                this.navCtrl.push(PHONE_USER_PROFILE, {uid: result.user.uid})
                  .catch(err => console.log(err))
                // push to create user
              } else {
                this.authService.updateUserSignInTimeByUid(result.user.uid)
                  .then(() => console.log('Updated time'))
                  .catch(err => console.log(err))
                this.navCtrl.setRoot(APPOINTMENT_LIST_PAGE)
                // push to home page
              }
            })
        }
      })
      .catch(err => {
        console.log(err, "Incorrect code entered?")
        this.code = null
      })
  }

}
