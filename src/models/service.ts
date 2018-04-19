export interface Service {
    name?: string,
    price?: {
        student?: any
        dentist?: any
    },
    duration?: any,
    canProvide?: {
        student?: boolean
        dentist?: boolean
    },
    creationTime?: any,
    lastUpdateTime?: any
}

export interface ServiceId extends Service {
    id?: string
}