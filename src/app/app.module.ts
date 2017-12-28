import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from 'app/main/main.component';
import { PlanningComponent } from './planning/planning.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventService } from './calendar/events.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlanningComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'planning', component: PlanningComponent },
      
    ])
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
