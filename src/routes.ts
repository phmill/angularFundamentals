import { Routes } from '@angular/router';
import { EventsListComponent } from "./app/events/events-list.component";
import { EventDetailsComponent } from './app/events/event-details/event-details.component';
import { CreateEventComponent } from './app/events/create-event.component';
import { Error404Component } from './app/errors/404.component';
import { EventRouteActivator } from './app/events/event-details/event-route-activator';
import { EventListResolver } from './app/events/events-list-resolver.service';
import { CreateSessionComponent } from './app/events/event-details';

export const appRoutes: Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
  { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver}},
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]},
  { path: 'events/session/new', component: CreateSessionComponent},
  { path: '404', component: Error404Component},
  { path: '', redirectTo: '/events', pathMatch: 'full'},
  { path: 'user', loadChildren: './user/user.module#UserModule'},
];
