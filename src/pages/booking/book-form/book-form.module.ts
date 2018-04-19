import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookFormPage } from './book-form';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../../pipes/pipes.module';

import { BookingCoreProvider } from '../../../providers/booking/core.service';
import { AuthGuard } from '../../auth/auth.guard';

@NgModule({
  declarations: [
    BookFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BookFormPage),
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
    AuthGuard,
    BookingCoreProvider
  ]
})
export class BookFormPageModule {}
