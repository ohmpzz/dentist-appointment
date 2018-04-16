import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { config } from '../configs/environment';

import { WindowService } from './win.service';

import { BookFormServiceComponent } from './booking/book-form-service/book-form-service';
import { BookFormComponent } from './booking/book-form/book-form';
import { BookConfirmPopupComponent } from './booking/book-confirm-popup/book-confirm-popup';
import { PhoneSignupComponent } from './phone-signup/phone-signup';

@NgModule({
	declarations: [BookFormServiceComponent,
    BookFormComponent,
    BookConfirmPopupComponent,
    PhoneSignupComponent
    ],
	imports: [
        ReactiveFormsModule,
        IonicModule,
    ],
	exports: [BookFormServiceComponent,
    BookFormComponent,
    BookConfirmPopupComponent,
    PhoneSignupComponent
    ],
    providers: [WindowService]
})
export class ComponentsModule {}
