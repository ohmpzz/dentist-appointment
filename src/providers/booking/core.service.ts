import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { map, take } from 'rxjs/operators';

import { Book } from '../../models/book';
import { ProviderId } from '../../models/provider';
import { CustomerId, Customer } from '../../models/patient';
import { Service, ServiceId } from '../../models/service';


@Injectable()
export class BookingCoreProvider {
  private readonly _servicesRef = this.afs.doc('services/serviceInfo').collection<ServiceId>('services')
  private readonly _appointmentsRef = this.afs.doc('appointments/appointmentInfo').collection('books')
  private readonly _providersRef = this.afs.doc('providers/providerInfo').collection<ProviderId>('providers')
  private readonly _patientsRef = this.afs.doc('patients/patientInfo').collection('patients') 

  constructor(private afs: AngularFirestore) {
  }

  addBooking(book: Book) {
    const itemRef: AngularFirestoreCollection<any> = this._appointmentsRef
    const prepare: Book = this.prepareAddBook(book)
    return itemRef.add(prepare)
  }

  getServices() {
    const itemsRef: AngularFirestoreCollection<any> = this._servicesRef
    return itemsRef.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {id: a.payload.doc.id, ...a.payload.doc.data() as Service}
          })
        })
      )
  }

  getProviders() {
    const itemsRef: AngularFirestoreCollection<any> = this._providersRef
    return itemsRef.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {id: a.payload.doc.id, ...a.payload.doc.data()}
          })
        })
      )
  }

  
  getUserById(uid: string) {
    const itemRef: AngularFirestoreDocument<any> = this._patientsRef.doc<CustomerId>(uid)
    return itemRef.snapshotChanges()
      .pipe(
        take(1),
        map(a => {
          return { id: a.payload.id, ...a.payload.data() as Customer }
        })
      )
  }

  private prepareAddBook(book: Book) {
    const prepare: Book = {
      cost: book.cost,
      creationTime: firebase.firestore.FieldValue.serverTimestamp(),
      duration: book.duration,
      customer: {
        customerId: book.customer.customerId,
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
