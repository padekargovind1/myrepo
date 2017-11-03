import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PublicService } from '../../services/public.service';

declare var $:any;
declare var fullCalendar: any;

@Component({
  selector: 'app-etablissement-evenement',
  templateUrl: './etablissement-evenement.component.html',
  styleUrls: ['./etablissement-evenement.component.scss']
})
export class EtablissementEvenementComponent implements OnInit, AfterViewInit {

  @Input() schoolData : any;
  events =[];
  eventToDisplay=[];
  constructor(private publicService : PublicService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.initCalendar();
    console.log(this.schoolData)
    this.events = this.schoolData.events;
    this.initEventData();
  }

  // Init the full calendar
  initCalendar(){
  	(<any> $('#calendar-detail-school')).fullCalendar({
      locale:'fr',
      eventClick: function(calEvent) {
        console.log(calEvent);
      },
      events:this.eventToDisplay
    });
  }

  // init the data from the school
  initEventData(){
    for(let event of this.events){
      this.eventToDisplay.push(
        {
          title : event.title.type,
          start : event.fromDate.type+' '+event.fromTime.type,
          end : event.toDate.type+' '+event.toTime.type
        }
      )
    }
    this.refreshCalendar();
  }

  //refreshing the calendar's data
  refreshCalendar(){
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', this.eventToDisplay);
    $('#calendar').fullCalendar('rerenderEvents');
  }

}
