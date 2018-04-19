import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentListPage } from './appointment-list';
import { AuthGuard } from '../../auth/auth.guard';
import { AppointmentCoreProvider } from '../../../providers/appointment/core.service';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    AppointmentListPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentListPage),
    PipesModule
  ],
  providers: [
    AuthGuard,
    AppointmentCoreProvider
  ]
})
export class AppointmentListPageModule {}
