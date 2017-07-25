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
    this.getEvent();
  }

  ngAfterViewInit(){
    this.initCalendar();
  }

  initCalendar(){
  	(<any> $('#calendar-detail-school')).fullCalendar({
      locale:'fr', 
      eventClick: function(calEvent) {
        console.log(calEvent);
      }, 
      events:this.eventToDisplay
    });
  }

  getEvent(){
    this.publicService.getEvent()
      .subscribe(
        (response)=>{
          let data = response.data;
          if(response.code==400){
            console.log(response.message)
          } else {
            this.events=data;
            this.initEventData();
          }
        }
      )
  }

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

  refreshCalendar(){
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', this.eventToDisplay);
    $('#calendar').fullCalendar('rerenderEvents');
  }

}
