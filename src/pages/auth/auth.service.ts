import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ApplicationVerifier } from '@firebase/auth-types';
import { AngularFirestore} from 'angularfire2/firestore';
import { AddCustomer, Customer, CustomerId } from '../../models/patient';
import * as firebase from 'firebase';


@Injectable()
export class AuthProvider {
  readonly _patientsRef = this.afs.doc('patients/patientInfo').collection('patients')  
  
  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
  ) {
  }

  phoneLogin(phoneNumber, appVerifier: ApplicationVerifier) {
    console.log('phoneLogin')
    this.afAuth.auth.useDeviceLanguage()
    return this.afAuth.auth.signInWithPhoneNumber(phoneNumber, appVerifier)
  }

  addUser(uid: string, user: AddCustomer) {
    const itemRef = this._patientsRef.doc(uid)
    user.isNewUser = true
    return itemRef.set(user)
      .then(res => {
        console.log('added')
      })
      .catch(err => {
        console.log(err)
      })
  }

  updateUser(uid: string, user: Customer) {
    const itemRef = this._patientsRef.doc(uid)
    user.isNewUser = false
    return itemRef.update(user)
  }

  getUserByNumber(number: string) {
    console.log(`old ${number}`)
    const prepareNumber = (number.indexOf('+66') != -1) ? number: `+66${number.slice(1)}`
    console.log(prepareNumber)
    const itemRef = this.afs.doc('patients/patientInfo').collection<Customer>('patients', ref => ref.where('phoneNumber', '==', prepareNumber))
    return itemRef.valueChanges()
  }

  updateUserSignInTimeByUid(uid: string) {
    const userInfo: Customer = {
      lastSignInTime: firebase.firestore.FieldValue.serverTimestamp()
    } 
    return this._patientsRef.doc(uid).update(userInfo)
  }

  public signOut() {
    return this.afAuth.auth.signOut()
  }

}

@Injectable()
export class WindowService {
  
  get windowRef() {
    return window
  }  

    constructor() {}

}
