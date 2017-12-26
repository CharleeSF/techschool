import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    let [year, month] = getNow();
    this.state = new Month(year, month);
    this.monthNames = MONTH_NAMES;
  }

}

class Month {
  month: number;
  startDay: number;
  numDays: number;
  weeks: Week[];
  constructor(year, month) {
    this.month = month;
    this.startDay = getStartDay(year, month); // on what day of the week falls the first day
    this.numDays = getNumDays(year, month);
    this.weeks = [];
    while ((this.weeks.length*NUMBER_OF_WEEKDAYS-this.startDay)<this.numDays) {
      this.weeks.push(new Week(this.weeks.length, this.startDay, this.numDays));
    }
  }
}

class Week {
  weekNum: number;
  days: Day[];
  constructor(numberOfWeeksSoFar, monthStartDay, numDays) {
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
        this.days.push(new Day(dayNum+i+1, i));
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
  constructor(monthNum, weekNum) {
    this.monthNum = monthNum;
    this.weekNum = weekNum;
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