import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class EventRouteActivator implements CanActivate {
  constructor(private eventsService: EventService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot):boolean {
    // !!this.. casts to a boolean - +route.. casts to a number
    const eventExists = !!this.eventsService.getEvent(+route.params['id']);

    if (!eventExists) {
      this.router.navigate(['/404']);
    }

    return eventExists;
  }
}
