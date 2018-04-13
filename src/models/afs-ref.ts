import { AngularFirestore } from 'angularfire2/firestore';

export class DatabaseRef {
    readonly _appointmentRef = this.afs.doc('appointments/appointmentInfo').collection('booking')
    readonly _servicesRef = this.afs.doc('services/serviceInfo').collection('services')
    readonly _providerRef = this.afs.doc('providers/providerInfo').collection('providers')  

    constructor(private afs: AngularFirestore) {}
}