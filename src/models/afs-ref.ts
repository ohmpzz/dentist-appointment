import { AngularFirestore } from 'angularfire2/firestore';

export class DatabaseRef {
    readonly _appointmentRef = this.afs.doc('appointments/appointmentInfo').collection('booking')
    readonly _servicesRef = this.afs.doc('services/serviceInfo').collection('services')
    readonly _providersRef = this.afs.doc('providers/providerInfo').collection('providers')  
    readonly _patientsRef = this.afs.doc('patients/patientInfo').collection('patients')

    constructor(private afs: AngularFirestore) {}
}