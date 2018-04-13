import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { map } from 'rxjs/operators';

import { Book } from '../../models/book';
import { DatabaseRef } from '../../models/afs-ref';

@Injectable()
export class BookingCoreProvider {

  constructor(private afs: AngularFirestore, private afsRef: DatabaseRef) {
  }

  addBooking(book: Book) {
    const itemRef = this.afsRef._appointmentRef
    const prepare: Book = this.prepareAddBook(book)
    return itemRef.add(prepare)
  }

  getServices() {
    const itemsRef = this.afsRef._servicesRef
    return itemsRef.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {id: a.payload.doc.id, ...a.payload.doc.data()}
          })
        })
      )
  }

  getProviders() {
    const itemsRef = this.afsRef._providerRef
    return itemsRef.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {id: a.payload.doc.id, ...a.payload.doc.data()}
          })
        })
      )
  }

  private prepareAddBook(book: Book) {
    const prepare: Book = {
      cost: book.cost,
      created_time: firebase.firestore.FieldValue.serverTimestamp(),
      customer: {
        name: book.customer.name,
        birthday: book.customer.birthday,
        phone: book.customer.phone,
        address: book.customer.address
      },
      datatime: {
        date: book.datatime.date,
        start_time: book.datatime.start_time,
        end_time: book.datatime.end_time
      },
      provider: {
        providerId: book.provider.providerId,
        name: book.provider.name,
        providerType: book.provider.providerType
      }
    }
    return prepare
  }


}
