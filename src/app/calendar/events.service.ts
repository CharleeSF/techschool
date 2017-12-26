import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  constructor(private http: Http) { }

  getEvents() {
    return this.http.get('assets/mocks.json')
          .map(response => response.json().eventsData);
  }
}
