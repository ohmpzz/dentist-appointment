import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WindowService } from '../win.service';
import * as firebase from 'firebase';

@Component({
  selector: 'phone-signup-component',
  template: `
    <form [formGroup]="signUpForm" novalidate>
      <ion-item>
        <ion-label color="dark" stacked>Email</ion-label>
        <ion-input formControlName="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label color="dark" stacked>Phone</ion-label>
        <ion-input formControlName="phoneNumber"></ion-input>
      </ion-item>
      <button ion-button [disabled]="signUpForm.invalid" id='sign-up-button' >Sign up</button>
    </form>
  `
})
export class PhoneSignupComponent {
  signUpForm: FormGroup
  windowRef: any
  @Output() signup = new EventEmitter<any>()

  constructor(private fb: FormBuilder, private win: WindowService) {
    this.init()
  }

  ngAfterViewInit() {
    console.log('here')
    this.windowRef = this.win.windowRef
    this
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-up-button', {
      size: 'invisible',
      callback: (response) => {
        console.log(response)
        return this.onSignUp()
      }
    })
    this.windowRef.recaptchaVerifier.render()
  }

  onSignUp() {
    this.signup.emit(this.signUpForm.value)
    console.log(this.signUpForm.value)
  }

  init() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', Validators.minLength(10)]
    })
  }

}
