import * as firebase from 'firebase';

export interface Event {
    past: boolean
    author: {
        name: string
        email: string
        uid: string
    }
    title: string
    startDate: Date
    endDate: Date
    body: string
    timestamp: firebase.firestore.FieldValue
}