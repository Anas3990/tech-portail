import * as firebase from 'firebase';

export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: firebase.firestore.FieldValue;

    constructor(file: File) {
        this.file = file;
    }
}