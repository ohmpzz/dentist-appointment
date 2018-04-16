import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfilePage } from './user-profile';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthProvider } from '../auth.service';

@NgModule({
  declarations: [
    UserProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfilePage),
    ReactiveFormsModule
  ],
  providers: [
    AuthProvider
  ]
})
export class UserProfilePageModule {}
