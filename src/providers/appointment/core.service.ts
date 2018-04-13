import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppointmentCoreProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

}
