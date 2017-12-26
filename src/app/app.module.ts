import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Pour traduire en français le format des dates
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

// Routes de l'application
import { appRoutes } from './routing/app.routes';

// Pour les formulaires
import { FormsModule } from '@angular/forms';

// Services de Firebase (AngularFire2)
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Importation du fichier qui contient les informatinos sur le projet Firebase (Tech Portail)
import { environment } from '../environments/environment';

// Services de l'application
import { AuthService } from './services/authentification/auth.service';
import { FirebaseService } from './services/database/firebase.service';
import { UploadService } from './services/storage/upload.service';
import { CloudMessagingService } from './services/FCM/cloud-messaging.service';
import { NotifyService } from './services/visual-feedback/notify.service';

import { NewInfosResolverService } from './services/resolvers/new-infos-resolver.service';
import { DocumentContentResolverService } from './services/resolvers/document-content-resolver.service';
import { EventInfosResolverService } from './services/resolvers/event-infos-resolver.service';

// Guards de l'application
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { CanWriteGuard } from './guards/can-write.guard';

// Module de NG2 SmartTable
import { Ng2SmartTableModule } from 'ng2-smart-table';

// Module pour la pagination
import { NgxPaginationModule } from 'ngx-pagination';

// Module pour afficher les notifications
import { SimpleNotificationsModule } from 'angular2-notifications';

// Modules de NGBootstrap
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

// Components de l'applicatoin
import { NavbarComponent } from './components/navbar/navbar.component';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NewsCenterComponent } from './components/news-center/news-center.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewInfosComponent } from './components/new-infos/new-infos.component';
import { AddNewComponent } from './components/add-new/add-new.component';

import { DocumentsCenterComponent } from './components/documents-center/documents-center.component';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { DocumentContentComponent } from './components/document-content/document-content.component';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { AddFileComponent } from './components/add-file/add-file.component';

import { EventsCenterComponent } from './components/events-center/events-center.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventInfosComponent } from './components/event-infos/event-infos.component';
import { AddEventComponent } from './components/add-event/add-event.component';

import { WorkshopScheduleComponent } from './components/workshop-schedule/workshop-schedule.component';

import { TeamComponent } from './components/team/team.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

import { UserAccountComponent } from './components/user-account/user-account.component';
import { ModifyPasswordComponent } from './components/modify-password/modify-password.component';
import { ModifyAccountComponent } from './components/modify-account/modify-account.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PageNotFoundComponent,
    NewsCenterComponent,
    NewsListComponent,
    NewInfosComponent,
    AddNewComponent,
    DocumentsCenterComponent,
    DocumentsListComponent,
    DocumentContentComponent,
    AddFolderComponent,
    AddFileComponent,
    EventsCenterComponent,
    EventsListComponent,
    EventInfosComponent,
    AddEventComponent,
    TeamComponent,
    ManageUsersComponent,
    WorkshopScheduleComponent,
    DashboardComponent,
    UserAccountComponent,
    ModifyPasswordComponent,
    ModifyAccountComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    SimpleNotificationsModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-CA" },
    AuthService, 
    AuthGuard,
    AdminGuard,
    CanWriteGuard,
    FirebaseService,
    UploadService,
    CloudMessagingService,
    NotifyService,
    NewInfosResolverService,
    DocumentContentResolverService,
    EventInfosResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
