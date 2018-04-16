import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneOtpPage } from './phone-otp';

import { WindowService, AuthProvider } from '../auth.service';

@NgModule({
  declarations: [
    PhoneOtpPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneOtpPage),
  ],
  providers: [
    WindowService,
    AuthProvider
  ]
})
export class PhoneOtpPageModule {}
