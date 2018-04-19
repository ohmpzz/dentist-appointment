import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';


@Component({
  selector: 'book-form',
  templateUrl: 'book-form.html'
})
export class BookFormComponent {
  bookForm: FormGroup

  constructor(private fb: FormBuilder) {
  }

  addBook() {

  }

  init() {
    this.bookForm = this.fb.group({
      cost: '',
      created_time: '',
      customer: this.fb.group({
        name: '',
        birthdat: '',
        phone: '',
        address: ''
      }),
      datetime: this.fb.group({
        date: '',
        start_time: '',
        end_time: ''
      }),
      provider: this.fb.group({
        providerId: '',
        name: '',
        providerType: ''
      }),
      status: ''
    })
  }

}
