import { Component, OnInit } from '@angular/core';
import { EventService } from './events.service';

const NUMBER_OF_WEEKDAYS = 7;
const MONTH_NAMES = ['January', 'February',
                    'March', 'April',
                    'May', 'June',
                    'July', 'August',
                    'September', 'Oktober',
                    'November', 'December'];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  state: Month;
  monthNames: string[];
  data: Map<String,Map<string,Array<Map<string, string>>>>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents()
        .subscribe(data => 
          this.state = consumeData(this, year, month, data));

    let [year, month] = getNow();
    this.monthNames = MONTH_NAMES;

  }

  printEvents = getEvents;
}

function consumeData(object, year, month, data) {
  return new Month(year, month, data);
}

class Month {
  month: number;
  startDay: number;
  numDays: number;
  weeks: Week[];
  constructor(year, month, data) {
    this.month = month;
    this.startDay = getStartDay(year, month); // on what day of the week falls the first day
    this.numDays = getNumDays(year, month);
    this.weeks = [];
    while ((this.weeks.length*NUMBER_OF_WEEKDAYS-this.startDay)<this.numDays) {
      this.weeks.push(new Week(data, year, this.month, this.weeks.length, this.startDay, this.numDays));
    }
  }
}

class Week {
  weekNum: number;
  days: Day[];
  constructor(data, year, month, numberOfWeeksSoFar, monthStartDay, numDays) {
    this.days = [];
    let startLoop = 1;
    if (numberOfWeeksSoFar == 0){
      for (let i=1; i<monthStartDay; i++) {
        this.days.push(undefined);
      }
      startLoop = monthStartDay;
    }
    for (let i=startLoop; i<=NUMBER_OF_WEEKDAYS; i++) {
      let dayNum = numberOfWeeksSoFar*NUMBER_OF_WEEKDAYS-monthStartDay;

      if ((dayNum + i) < numDays) {
        this.days.push(new Day(data, year, month, dayNum+i+1, i));
      }
      else {
        this.days.push(undefined);
      }
    }
  }
}

class Day {
  monthNum: number;
  weekNum: number;
  events: Event[];
  constructor(data, year, month, monthNum, weekNum) {
    this.monthNum = monthNum;
    this.weekNum = weekNum;
    this.events = getEvents(data, year, month, this.monthNum);
  }
}

class Event {
  description: string;
  start: [number, number];
  end: [number, number];
  isLecture: boolean;
  constructor(description, start, end, isLecture) {
    this.description = description;
    this.start = start;
    this.end = end;
    this.isLecture = isLecture;
  }
}

function getNow() {
  let now = Date.now();
  console.log('now');
  return [2017, 12];
}

function getStartDay(year, month) {
  return 3;
}

function getNumDays(year, month) {
  return 30;
}

function getEvents(data, year, month, dayNum) {
  if (data!==undefined) {
    let events = [];
    let eventsJson = data[year][month][dayNum];
    if (eventsJson!==undefined) {
      for (event of eventsJson) {
        console.log(event);
        events.push(new Event(event["description"],
                              [event["start_hours"], event["start_minutes"]],
                              [event["stop_hours"], event["stop_minutes"]],
                            event["isLecture"]));
      }
    }
    return events;
  }
  else {
    console.log("no data :(");
    return [new Event("bla", [20,30], [21,30], false)];
    
  }
  
}