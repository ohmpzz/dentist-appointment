export interface Customer extends AddCustomer {
    firstname?: any
    lastname?: any
    fullname?: any
    birthday?: any
    photoURL?: any
    address?: any
}

export interface CustomerId extends Customer {
    customer_id?: any
}

export interface AddCustomer {
    phoneNumber?: any,
    isNewUser?: boolean,
    creationTime?: any
    lastSignInTime?: any
    email?: any
}

