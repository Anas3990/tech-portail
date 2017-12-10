import { Url } from "url";

export interface User{
    uid: string
    email: string
    firstName?: string
    name?: string
    group?: number
    photoUrl?: Url
    professionalTitle?: string
    homePhoneNumber1?: string
    homePhoneNumber2?: string
    mobilePhoneNumber?: string
    role: string
}