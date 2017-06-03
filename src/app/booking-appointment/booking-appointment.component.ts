import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ScheduleModule, DialogModule } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-booking-appointment',
  templateUrl: './booking-appointment.component.html',
  styleUrls: ['./booking-appointment.component.scss'],
  providers: [EventService]
})
export class BookingAppointmentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private eventService: EventService, private sharedService: SharedService, private cd: ChangeDetectorRef) { }

  packegId: number;
  private sub: any;
  advisors: any[];
  events: any[];
  headerConfig: any;
  eventsData;
  display: boolean = false;
  selectedAdvisor;
  selectedDate;
  selectedAdvisorID;

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
      this.packegId = params['id'];
      this.sharedService.selectedPackageID=params['id'];
      this.eventService.getAdvisor(this.packegId).then(advisors => {
      this.advisors = advisors;
      this.advisorClick(this.advisors[0]._id, this.advisors[0].fullName);
      });
    });

    this.headerConfig = {
      left: '',
      center: 'prev title next',
      right: 'today agendaDay,agendaWeek,month'
    }
     
  }


  showDialog() {
  this.display = true;
  }

  handleEventClick(e,fc ) {
  
  
    this.display = true;
    //this.selectedDate = + e.date._d;
    console.log(fc);

    fc.changeView("agendaDay");
    
    //e.changeView("agendaDay");
      this.cd.detectChanges();
        
       


    //e("changeView","agendaDay");
    //e.view.changeView("agendaDay");

  }  

  advisorClick(advisorID, advisorName) {
      this.eventService.getAdvisorData(advisorID).then(events => {
      var str = JSON.stringify(events);
      str = str.replace(/from/g, 'start');
      str = str.replace(/to/g, 'end');
      this.events = JSON.parse(str);
      this.selectedAdvisor = advisorName;
      this.selectedAdvisorID=advisorID;
    });
  }
}
