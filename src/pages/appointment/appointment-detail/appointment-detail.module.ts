import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentDetailPage } from './appointment-detail';
import { AppointmentDatePipe } from '../../../pipes/appointment-date/appointment-date';

@NgModule({
  declarations: [
    AppointmentDetailPage,
    AppointmentDatePipe
  ],
  imports: [
    IonicPageModule.forChild(AppointmentDetailPage),
  ],
})
export class AppointmentDetailPageModule {}
