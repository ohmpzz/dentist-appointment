export interface Book {
    provider?: {
        providerId?: string
        name?: string
        providerType?: string
    },
    service?: string
    cost?: number
    customer?: {
        customerId?: string
        name?: string
        birthday?: string
        phone?: any 
        address?: string
    },
    status?: any
    duration?: any,
    datetime?: {
        date?: any
        start_time?: any
        end_time?: any 
    },
    creationTime?: any
}

export interface Appointment extends Book {
    id?: string
}
