import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentDetailPage } from './appointment-detail';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    AppointmentDetailPage
  ],
  imports: [
    IonicPageModule.forChild(AppointmentDetailPage),
    PipesModule
  ],
})
export class AppointmentDetailPageModule {}
