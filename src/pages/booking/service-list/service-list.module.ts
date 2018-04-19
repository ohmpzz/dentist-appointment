import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceListPage } from './service-list';
import { PipesModule } from '../../../pipes/pipes.module';

import { AuthGuard } from '../../auth/auth.guard';
import { BookingCoreProvider } from '../../../providers/booking/core.service';

@NgModule({
  declarations: [
    ServiceListPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceListPage),
    PipesModule,
  ],
  providers: [
    AuthGuard,
    BookingCoreProvider
  ]
})
export class ServiceListPageModule {}
