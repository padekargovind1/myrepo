import { Component, OnInit } from '@angular/core';
import {ScheduleModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';

@Component({
  selector: 'app-booking-appointment',
  templateUrl: './booking-appointment.component.html',
  styleUrls: ['./booking-appointment.component.scss']
})
export class BookingAppointmentComponent implements OnInit {

  constructor() { }

  events: any[];
  headerConfig: any;

  display: boolean = false;

  showDialog() {
        this.display = true;
    }



handleEventClick(e) {
  console.log(e);
 
  //e.click=$('#appointment').modal('show');
        //e.event = Selected event
        //e.jsEvent = Browser click event
        //e.view = Current view object
    }


    ngOnInit() {
        this.events = [
            {
                "title": "All Day Event",
                "start": "2017-05-01"
            },
            {
                "title": "Long Event",
                "start": "2016-01-07",
                "end": "2016-01-10"
            },
            {
                "title": "Repeating Event",
                "start": "2016-01-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2016-01-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2016-01-11",
                "end": "2016-01-13"
            }
        ];

this.headerConfig = {		
			left: '',
			center: 'prev title next',
			right: 'today agendaDay,agendaWeek,month'
		}



    }

}
