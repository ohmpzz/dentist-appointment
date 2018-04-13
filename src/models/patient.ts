export interface Customer {
    firstname?: any
    lastname?: any
    fullname?: any
    birthday?: any
    photoURL?: any
    phone?: any
}

export interface CustomerId extends Customer {
    customer_id?: any
}