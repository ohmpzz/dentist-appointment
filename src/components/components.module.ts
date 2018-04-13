import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BookFormServiceComponent } from './booking/book-form-service/book-form-service';
import { BookFormComponent } from './booking/book-form/book-form';
import { BookConfirmPopupComponent } from './booking/book-confirm-popup/book-confirm-popup';


@NgModule({
	declarations: [BookFormServiceComponent,
    BookFormComponent,
    BookConfirmPopupComponent],
	imports: [
        ReactiveFormsModule
    ],
	exports: [BookFormServiceComponent,
    BookFormComponent,
    BookConfirmPopupComponent]
})
export class ComponentsModule {}
