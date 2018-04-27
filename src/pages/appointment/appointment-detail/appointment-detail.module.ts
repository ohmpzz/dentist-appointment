import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentDetailPage } from './appointment-detail';
import { PipesModule } from '../../../pipes/pipes.module';
import { AppointmentCoreProvider } from '../../../providers/appointment/core.service';

@NgModule({
  declarations: [
    AppointmentDetailPage
  ],
  imports: [
    IonicPageModule.forChild(AppointmentDetailPage),
    PipesModule
  ],
  providers: [
    AppointmentCoreProvider
  ]
})
export class AppointmentDetailPageModule {}
