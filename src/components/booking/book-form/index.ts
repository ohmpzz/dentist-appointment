import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';

import { BookFormComponent } from './book-form';

@NgModule({
	declarations: [
    BookFormComponent,
    ],
	imports: [
        ReactiveFormsModule,
        IonicModule,
    ],
	exports: [
    BookFormComponent,   
    ],
})
export class BookFormComponentModule {}
