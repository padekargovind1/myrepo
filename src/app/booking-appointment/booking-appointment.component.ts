import { Component, OnInit } from '@angular/core';
import {ScheduleModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-booking-appointment',
  templateUrl: './booking-appointment.component.html',
  styleUrls: ['./booking-appointment.component.scss'],
  providers: [EventService]
})
export class BookingAppointmentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private eventService : EventService) { }


 packegId: number;
 private sub: any;
  advisors:any[];

  events: any[];
  headerConfig: any;

  display: boolean = false;

  showDialog() {
        this.display = true;
    }



handleEventClick(e) {
  this.showDialog(); 
    }


    ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
       this.packegId = params['id'];
       console.log(this.packegId);
            
        this.eventService.getAdvisor(this.packegId).then(advisors => {
             this.advisors= advisors;
             console.log( this.advisors)
        });

});    

    this.headerConfig = {		
			left: '',
			center: 'prev title next',
			right: 'today agendaDay,agendaWeek,month'
		}
}

advisorClick(advisorID)
{
  console.log(advisorID);
  
}


}
