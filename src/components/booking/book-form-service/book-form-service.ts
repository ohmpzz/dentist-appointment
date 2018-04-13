import { Component } from '@angular/core';

/**
 * Generated class for the BookFormServiceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'book-form-service',
  templateUrl: 'book-form-service.html'
})
export class BookFormServiceComponent {

  text: string;

  constructor() {
    console.log('Hello BookFormServiceComponent Component');
    this.text = 'Hello World';
  }

}
