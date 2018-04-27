import { APPOINTMENT_LIST_PAGE } from './../../page-ref';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firebase } from '@ionic-native/firebase';

import { WindowService, AuthProvider } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { PHONE_OTP_PAGE } from '../../page-ref';
import { first } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-phone-login',
  templateUrl: 'phone-login.html',
})
export class PhoneLoginPage {
  windowRef: any
  phoneNumber = new PhoneNumber()
  signUpForm: FormGroup
  signInForm: FormGroup

  isSignIn: boolean = true
  actionName: string = 'Sign In'

  isSignInInvalid: boolean = false
  isSignUpInvalid: boolean = false

  signUpMsg: any = null
  signInMsg: any = null

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private win: WindowService,
    private authService: AuthProvider,
    private fb: FormBuilder,
    private guard: AuthGuard,
    private firebase: Firebase
  ) {
    this.init()
    this.isSignIn = true
    this.actionName = 'เข้าสู่ระบบ'
    this.signInMsg = null
    this.signUpMsg = null
  }

  ionViewDidLoad() {
/*     this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log(response)
        // this.windowRef.recaptchaVerifier.reset(response)
        return (this.isSignIn) ? this.onSignInSubmit() : this.onSignUpSubmit()
      }
    })
    this.windowRef.recaptchaVerifier.render()
 */
    

    
      /* .then((widgetId) => {
        this.windowRef.recaptchaWidgetId = widgetId
        console.log(widgetId)
        // document.getElementById('sign-in-button').disabled = true;
      }) */
  }

  /* get isCompleted(): boolean {
    if(this.isSignIn) {
      console.log('in ', this.signInForm.invalid)
      return this.signInForm.invalid
    } else if(!this.isSignIn) {
      return this.signUpForm.invalid
    }
    return true
  }
 */
  onSignInSubmit() {
    if(this.signInForm.invalid) {
      return this.isSignInInvalid = true
    } else { this.isSignInInvalid = false }
  
    this.phoneNumber.number = this.signInForm.get('phoneNumber').value
    const phoneNumber = this.phoneNumber.e164
    let appVerifier

    this.firebase.verifyPhoneNumber(this.phoneNumber.number, 60)
      .then(credential => {
        console.log(credential);
  
      var verificationId = credential.verificationId;
        appVerifier = credential.verificationId;

        this.authService.getUserByNumber(phoneNumber).pipe(
          first()
        )
        .subscribe(res => {
          console.log(res[0])
          if(res.length > 0) {
            this.authService.phoneLogin(phoneNumber, appVerifier)
              .then((confirmationResult) => {
                this.windowRef.confirmationResult = confirmationResult
                console.log('has user')
                console.log(confirmationResult)
                this.navCtrl.push(PHONE_OTP_PAGE)
              })
              .catch((error) => {
                console.log('err')
                console.log(JSON.stringify(error))
              })
          } else {
            console.log('No data')
            this.signInMsg = 'ไม่พบบัญชีของคุณ'
            // say: No account or something
          }
        })



      })
      .catch(err => console.log(err))
  }

  onSignUpSubmit() {
    if(this.signUpForm.invalid) {
      return this.isSignUpInvalid = true
    } else { this.isSignUpInvalid = false}

    console.log(this.signUpForm.value)
    this.phoneNumber.number = this.signUpForm.get('phoneNumber').value
    const phoneNumber = this.phoneNumber.e164
    const appVerifier = this.windowRef.recaptchaVerifier
    this.authService.getUserByNumber(phoneNumber).pipe(
      first()
    )
    .subscribe(res => {
      if(res.length == 0) {
        this.authService.phoneLogin(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            this.windowRef.confirmationResult = confirmationResult
            console.log(confirmationResult)
            this.navCtrl.push(PHONE_OTP_PAGE, {email: this.signUpForm.get('email').value})
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        console.log('has data')
        this.signInMsg = 'หมายเลขโทรศัพท์หรืออีเมล์นี้เชื่อมโยงกับบัญชีแล้ว'
        // do something
      }
    })
  }

  onActionBtn(action: boolean) {
    this.actionName = (action)? 'เข้าสู่ระบบ': 'สมัคร'
    return this.isSignIn = action
  }

  init() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', Validators.minLength(10)]
    })

    this.signInForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  test() {
    this.navCtrl.setRoot(APPOINTMENT_LIST_PAGE)
      .then((result) => result ? console.log('OK') : console.log('Access denied - pls sign-in'))
      .catch(err => console.log(err))
  }

  testAuth() {
    /* this.firebase.verifyPhoneNumber('+66800388836', 60)
      .then(credential => {
        console.log(credential);
  
      var verificationId = credential.verificationId;
      })
      .catch(err => console.log(err)) */

     /*  this.firebase.getToken()
  .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
  .catch(error => console.error('Error getting token', error));
     */
    this.navCtrl.setRoot(APPOINTMENT_LIST_PAGE)
  }

  onAct() {
    return (this.isSignIn) ? this.onSignInSubmit() : this.onSignUpSubmit()
  }


}


export class PhoneNumber {
  country: string = "+66"
  number: string

  get e164() {
    let num
    (this.number.charAt(0) == '0') ? 
    num = this.country + this.number.slice(1) : num = this.country + this.number 
    return `${num}`
  }
}
