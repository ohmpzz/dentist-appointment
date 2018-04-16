import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentListPage } from './appointment-list';
import { AuthGuard } from '../../auth/auth.guard';

@NgModule({
  declarations: [
    AppointmentListPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentListPage),
  ],
  providers: [
    AuthGuard
  ]
})
export class AppointmentListPageModule {}
