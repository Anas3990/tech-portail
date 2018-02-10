import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//
import 'rxjs/add/operator/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

//
import { New } from './../../models/New';
import { Folder } from './../../models/Folder';
import { Event } from './../../models/Event';
import { User } from './../../models/User';
import { Attendance } from './../../models/Attendance';

@Injectable()
export class FirebaseService {
  //
  newsCollection: AngularFirestoreCollection<New>;
  news: Observable<New[]>;

  newDoc: AngularFirestoreDocument<New>;
  new: Observable<New>;

  //
  foldersCollection: AngularFirestoreCollection<Folder>;
  folders: Observable<Folder[]>;

  folderDoc: AngularFirestoreDocument<Folder>;
  folder: Observable<Folder>;

  //
  upComingEvents: Observable<Event[]>;
  pastEvents: Observable<Event[]>;
  currentEvents: Observable<Event[]>;

  eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;

  //
  studentsCollection: AngularFirestoreCollection<User>;
  mentorsCollection: AngularFirestoreCollection<User>;
  pendingUsersCollection: AngularFirestoreCollection<User>;

  students: Observable<User[]>;
  mentors: Observable<User[]>;
  pendingUsers: Observable<User[]>

  //
  attendancesCollection: AngularFirestoreCollection<Attendance>;
  nonAttendancesCollection: AngularFirestoreCollection<Attendance>;
  attendances: Observable<Attendance[]>;
  nonAttendances: Observable<Attendance[]>;

  attendanceDoc: AngularFirestoreDocument<Attendance>;
  nonAttendanceDoc: AngularFirestoreDocument<Attendance>;
  attendance: Observable<Attendance>;
  nonAttendance: Observable<Attendance>;

  //
  referenceDate: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  //
  getNews() {
    this.newsCollection = this.afs.collection('news', ref => {
      return ref.orderBy('timestamp', 'desc');
    });

    this.news = this.newsCollection.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as New;
        const id = snapshot.payload.doc.id;
        return { id, ...data };
      })
    });

    return this.news;
  }

  getFolders() {
    this.foldersCollection = this.afs.collection('folders', ref => {
      return ref.orderBy('timestamp', 'desc');
    });

    this.folders = this.foldersCollection.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as Folder;
        const id = snapshot.payload.doc.id;
        return { id, ...data };
      })
    });

    return this.folders;
  }

  getUpComingEvents() {
    this.upComingEvents = this.referenceDate.pipe(
      switchMap(date => 
        this.afs
            .collection<Event>('events', ref => ref.where('startDate', '>', date))
            .snapshotChanges()
            .map(array => { 
              return array.map(snapshot => {
                const data = snapshot.payload.doc.data() as Event;
                const id = snapshot.payload.doc.id;
                return { id, ...data };
              })
            }),
      ),
    );

    return this.upComingEvents;
  }

  getAttendances(id) {
    this.attendancesCollection = this.afs.collection('/events').doc(id).collection('attendances', ref => {
      return ref.where('present', '==', true);
    });

    this.attendances = this.attendancesCollection.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as Attendance;
        const id = snapshot.payload.doc.id;
        return { id, ...data };
      })
    });

    return this.attendances;
  }

  getNonAttendances(id) {
    this.nonAttendancesCollection = this.afs.collection('/events').doc(id).collection('attendances', ref => {
      return ref.where('present', '==', false);
    });

    this.nonAttendances = this.nonAttendancesCollection.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as Attendance;
        const id = snapshot.payload.doc.id;
        return { id, ...data };
      })
    });

    return this.nonAttendances;
  }

  getUserAttendance(id) {
    let attendanceRef = this.afs.collection('events').doc(id).collection('attendances').doc(this.afAuth.auth.currentUser.uid);

    let userAttendance = attendanceRef.snapshotChanges().map(snapshot => {
      if (snapshot.payload.exists == true) {
        return snapshot.payload.get('present')
      } else {
        return null
      }
    })   
    
    return userAttendance;
  }

  getPastEvents() {
    this.pastEvents = this.referenceDate.pipe(
      switchMap(date =>
        this.afs.collection<Event>('events', ref => ref.where('endDate', '<', date).orderBy('endDate', 'desc'))
        .snapshotChanges()
        .map(array => {
          return array.map(snapshot => {
            const data = snapshot.payload.doc.data() as Event;
            const id = snapshot.payload.doc.id;
            return { id, ...data };
          })
        })
      )
    )

    return this.pastEvents;
  }

  getCurrentEvents() {
    this.currentEvents = this.referenceDate.pipe(
      switchMap(date => 
        this.afs.collection<Event>('events', ref => ref.where('startDate', '<', date).where('endDate', '>', date))
        .snapshotChanges()
        .map(array => {
          return array.map(snapshot => {
            const data = snapshot.payload.doc.data() as Event;
            const id = snapshot.payload.doc.id;
            return { id, ...data };
          })
        })
      )
    )

    return this.currentEvents;
  }

  //
  getStudents() {
    this.studentsCollection = this.afs.collection('users', ref => {
      return ref.where('approved', '==', true).where('roles.mentor', '==', false).orderBy("name");
    });

    this.students = this.studentsCollection.valueChanges();

    return this.students;
  }
  
  //
  getMentors() {
    this.mentorsCollection = this.afs.collection('users', ref => {
      return ref.where('approved', '==', true).where('roles.mentor', '==', true).orderBy("name");
    });

    this.mentors = this.mentorsCollection.valueChanges();

    return this.mentors;
  }

  //
  getPendingUsers() {
    this.pendingUsersCollection = this.afs.collection('users', ref => {
      return ref.where('approved', '==', false).orderBy('name');
    });
    
    this.pendingUsers = this.pendingUsersCollection.valueChanges();

    return this.pendingUsers;
  }

  //
  getNewDetails(id) {
    this.newDoc = this.afs.doc('news/' + id);
    this.new = this.newDoc.valueChanges();
    
    return this.new;
  }

  getFolderContent(id) {
    this.folderDoc = this.afs.doc('folders/' + id);
    this.folder = this.folderDoc.valueChanges();

    return this.folder;
  }

  getEventDetails(id) {
    this.eventDoc = this.afs.doc('events/' + id);
    this.event = this.eventDoc.valueChanges();

    return this.event;
  }

  //
  deleteFolder(id) {
    this.folderDoc = this.afs.doc('folders/' + id);
    
    return this.folderDoc.delete();
  }

  //
  addEvent(event: Event) {

  }

  editEvent(event: Event) {

  }

  deleteEvent(event: Event) {
    
  }
}
