import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneLoginPage } from './phone-login';

import { ComponentsModule } from '../../../components/components.module';

import { AuthProvider, WindowService } from '../auth.service';
import { AuthGuard } from '../auth.guard';

@NgModule({
  declarations: [
    PhoneLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneLoginPage),
    ComponentsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthProvider,
    WindowService,
    AuthGuard
  ]
})
export class PhoneLoginPageModule {}
