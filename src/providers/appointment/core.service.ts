import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Appointment } from '../../models/book';

@Injectable()
export class AppointmentCoreProvider {
  private readonly _appointmentsRef = this.afs.doc('appointments/appointmentInfo').collection<Appointment>('books')  

  constructor(private afs: AngularFirestore) {
    console.log('Hello AuthProvider Provider');
  }

  getAppointment(): any {
    const itemsRef: AngularFirestoreCollection<any> = this._appointmentsRef
    return itemsRef.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {id: a.payload.doc.id, ...a.payload.doc.data() as Appointment}
          })
        })
      )
  }

  getAppointmentByUserId(uid: any): Observable<any> {
    const itemsRef: AngularFirestoreCollection<any> = this.afs.doc('appointments/appointmentInfo').collection<Appointment>('books', ref =>
      ref.where('customer.customerId', '==', uid))
    return itemsRef.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {id: a.payload.doc.id, ...a.payload.doc.data() as Appointment}
          })
        })
      )
  }

  getAppointmentById(id: string) {
    const itemRef: AngularFirestoreDocument<any> = this._appointmentsRef.doc(id)
    return itemRef.snapshotChanges()
      .pipe(
        map(a => {
          return {id: a.payload.id, ...a.payload.data() as Appointment}
        })
      )  
  }

  deleteAppointmentById(id: string) {
    const itemRef: AngularFirestoreDocument<any> = this._appointmentsRef.doc(id)
    return itemRef.delete()
  }

  sortByAction(data: Observable<any>, action): Observable<any> {
    let item$: Observable<any> = data
    return item$
  }


}
