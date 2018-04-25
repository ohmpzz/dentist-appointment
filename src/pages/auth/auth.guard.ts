import { Injectable, AnimationKeyframesSequenceMetadata } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, take } from 'rxjs/operators';

import { CustomerId } from '../../models/patient';

@Injectable()
export class AuthGuard {
  private _authState: any
  private _userInfo: CustomerId
  public userInfo$: Observable<any> = null

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
      this._authState = auth
      this.getUserInfo('5kgK9HdJs2X1hBab8xR57aYTPOu2')
    })
  }

  set setAuthen(auth) {
    this._authState = auth
  }

  get isLoggedIn(): boolean {
    return /* !!this._authState */ true
  }

  get currentUser(): any {
    return this.isLoggedIn ? this._authState : null
  }

  get authState$(): Observable<any> {
    return this.afAuth.authState
  }

  get currentUserId(): string {
    /* return this.isLoggedIn ? this._authState['uid'] : '5kgK9HdJs2X1hBab8xR57aYTPOu2' */
    return this.isLoggedIn ? '5kgK9HdJs2X1hBab8xR57aYTPOu2' : ''
  }

  get userInfo(): CustomerId {
    return this._userInfo
  }


  public signOut() {
    return this.afAuth.auth.signOut()
  }

  private getUserInfo(uid: string) {
    this.afs.doc('patients/patientInfo').collection<CustomerId>('patients').doc(uid)
      .snapshotChanges().pipe(
        take(1),
        map(action => {
          return {id: action.payload.id, ...action.payload.data() as CustomerId}
        })
      )
      .subscribe(user => {
        if(user) {
          this._userInfo = user
        } else {
          this._userInfo = null
        }
        
      })
  }


}
