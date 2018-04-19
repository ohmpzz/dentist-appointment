export interface Book {
    status?: any
    duration?: any
    service?: string
    creationTime?: any
    cost?: number
    provider?: {
        providerId?: string
        name?: string
        providerType?: string
    },
    customer?: {
        customerId?: string
        name?: string
        birthday?: string
        phone?: any 
        address?: string
    },
    datetime?: {
        date?: any
        start_time?: any
        end_time?: any 
    },
}

export interface Appointment extends Book {
    id?: string
}
