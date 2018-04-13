export interface Book {
    provider?: {
        providerId?: string
        name?: string
        providerType?: string
    },
    service?: string
    cost?: number
    customer?: {
        name?: string
        birthday?: string
        phone?: any
        address?: string
    },
    status?: any
    datatime?: {
        date?: any
        start_time?: any
        end_time?: any
    },
    created_time?: any
}

export interface Appointment extends Book {
    bookId?: any
}
