import { Url } from "url";

export interface Roles {
    admin?: boolean
    mentor?: boolean
}

export interface User{
    uid: string
    email: string
    roles: Roles
    approved: boolean
    firstName?: string
    name?: string
    group?: number
    photoUrl?: string
    professionalTitle?: string
    homePhoneNumber1?: string
    homePhoneNumber2?: string
    mobilePhoneNumber?: string
    timestamp: number
}