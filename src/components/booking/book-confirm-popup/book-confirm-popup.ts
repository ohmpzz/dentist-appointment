import { Component } from '@angular/core';

/**
 * Generated class for the BookConfirmPopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'book-confirm-popup',
  templateUrl: 'book-confirm-popup.html'
})
export class BookConfirmPopupComponent {

  text: string;

  constructor() {
    console.log('Hello BookConfirmPopupComponent Component');
    this.text = 'Hello World';
  }

}
