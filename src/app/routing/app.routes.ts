import { NgModule } from '@angular/core';
import { RouterModule ,Routes } from "@angular/router";

//
import { AuthGuard } from './../guards/auth.guard';
import { AdminGuard } from './../guards/admin.guard';
import { CanWriteGuard } from './../guards/can-write.guard';

//
import { NewInfosResolverService } from './../services/resolvers/new-infos-resolver.service';
import { DocumentContentResolverService } from './../services/resolvers/document-content-resolver.service';
import { EventInfosResolverService } from './../services/resolvers/event-infos-resolver.service';

//
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';

import { DashboardComponent } from '../components/dashboard/dashboard.component';

import { NewsCenterComponent } from '../components/news-center/news-center.component';
import { NewsListComponent } from '../components/news-list/news-list.component';
import { NewInfosComponent } from '../components/new-infos/new-infos.component';
import { AddNewComponent } from '../components/add-new/add-new.component';

import { DocumentsCenterComponent } from '../components/documents-center/documents-center.component';
import { DocumentsListComponent } from './../components/documents-list/documents-list.component';
import { DocumentContentComponent } from './../components/document-content/document-content.component';

import { EventsCenterComponent } from '../components/events-center/events-center.component';
import { EventsListComponent } from '../components/events-list/events-list.component';
import { EventInfosComponent } from '../components/event-infos/event-infos.component';
import { AddEventComponent } from '../components/add-event/add-event.component';

import { WorkshopScheduleComponent } from '../components/workshop-schedule/workshop-schedule.component';

import { TeamComponent } from '../components/team/team.component';
import { ManageUsersComponent } from '../components/manage-users/manage-users.component';

import { UserAccountComponent } from '../components/user-account/user-account.component';
import { ModifyPasswordComponent } from '../components/modify-password/modify-password.component';
import { ModifyAccountComponent } from '../components/modify-account/modify-account.component';

import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  //
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  //
  { path: 'user-login', component: LoginComponent },
  { path: 'user-signup', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  //
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  //
  { path: 'news', 
    component: NewsCenterComponent,
    canActivate: [AuthGuard],
    children: [ 
    {
      path: '',
      component: NewsListComponent,
      children: [
        {
          path: '',
          component: NewsCenterComponent
        },
        {
          path: 'afficher/:id',
          component: NewInfosComponent,
          resolve: {
            newObject: NewInfosResolverService
          }
        }
      ]
    },
    {
      path: 'post-new',
      component: AddNewComponent,
      canActivate: [CanWriteGuard]
    }
  ]},

  //
  { path: 'documents',
    component: DocumentsCenterComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DocumentsListComponent,
        children: [
          {
            path: '',
            component: DocumentsCenterComponent
          }
        ] 
      },
      {
        path: 'document/:id',
        component: DocumentContentComponent,
        resolve: {
          folderObject: DocumentContentResolverService
        }
      }
    ]},

  //
  { path: 'events', 
    component: EventsCenterComponent,
    canActivate: [AuthGuard],
    children: [ 
    {
      path: '',
      component: EventsListComponent,
      children: [
        {
          path: '',
          component: EventsCenterComponent
        },
        {
          path: 'afficher/:id',
          component: EventInfosComponent,
          resolve: {
            eventObject: EventInfosResolverService
          }
        }
      ]
    },
    {
      path: 'post-event',
      component: AddEventComponent,
      canActivate: [CanWriteGuard]
    }
  ]},
  
  { path: 'workshop-schedule', component: WorkshopScheduleComponent, canActivate: [AuthGuard] },

  //
  { path: 'users', component: TeamComponent, canActivate: [AuthGuard] },

  //
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AdminGuard, AuthGuard] },

  //
  { path: 'profile',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserAccountComponent
      },
      {
        path: 'modify/infos',
        component: ModifyAccountComponent
      }, 
      {
        path: 'modify/password',
        component: ModifyPasswordComponent
      }
    ]
  },

  //
  { path: '**', component: PageNotFoundComponent }
];