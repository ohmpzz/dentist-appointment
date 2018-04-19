import { Injectable, AnimationKeyframesSequenceMetadata } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, take } from 'rxjs/operators';

import {} from '../auth/auth.service';

@Injectable()
export class AuthGuard {
  private _authState: any
  private _userInfo: any

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      this._authState = auth
    })
  }

  set setAuthen(auth) {
    this._authState = auth
  }

  get isLoggedIn(): boolean {
    return !!this._authState
  }

  get currentUser(): any {
    return this.isLoggedIn ? this._authState : null
  }

  get authState$(): Observable<any> {
    return this.afAuth.authState
  }

  get currentUserId(): string {
    return this.isLoggedIn ? this._authState['uid'] : ''
  }


  public signOut() {
    return this.afAuth.auth.signOut()
  }


}
