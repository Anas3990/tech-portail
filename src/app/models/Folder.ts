import * as firebase from 'firebase';

export interface Folder {
    name: string;
    timestamp: firebase.firestore.FieldValue;
}