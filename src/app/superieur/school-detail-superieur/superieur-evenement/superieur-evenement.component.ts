import { Component, OnInit, Input } from '@angular/core';
//import { PublicService } from '../../../services/public.service';

declare var $:any;
declare var fullCalendar: any;

@Component({
  selector: 'app-superieur-evenement',
  templateUrl: './superieur-evenement.component.html',
  styleUrls: ['./superieur-evenement.component.scss']
})
export class SuperieurEvenementComponent implements OnInit {
  @Input() schoolData : any;
  events =[];
  eventToDisplay=[];
  showCalendar : boolean = false;
  constructor(//private publicService : PublicService
    ) { }

  ngOnInit() {
    console.log(this.schoolData)
    this.events = this.schoolData.events;
    this.initEventData();
  }

  ngAfterViewInit(){

  }

  initCalendar(){
  	(<any> $('#calendar-detail-school')).fullCalendar({
      locale:'fr',
      eventClick: function(calEvent) {
        console.log(calEvent);
      },
      events:this.eventToDisplay
    });
    this.showCalendar=true;
  }

  initEventData(){
    console.log("test1")
    for(let event of this.events){
      // console.log(event)
      let start = event.fromDate.substr(0, 10)
      console.log(start)
      this.eventToDisplay.push(
        {
          title : event.title,
          start : event.fromDate,
          end : event.toDate
        }
      )
    }
    console.log(this.eventToDisplay)
    this.initCalendar();
  }

  // refreshCalendar(){
  //   $('#calendar').fullCalendar('removeEvents');
  //   $('#calendar').fullCalendar('addEventSource', this.eventToDisplay);
  //   $('#calendar').fullCalendar('rerenderEvents');
  // }

}
