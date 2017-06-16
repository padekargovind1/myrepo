import { ViewChild, Directive, ElementRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { EventModal } from '../../core/models/events.modal';
import { SharedService } from '../../core/services/shared.service';
import { Observable } from 'rxjs/Rx';

declare var $: any;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers: [EventService]
})

@Directive({
  selector: '#rootwizard'
})

export class WizardComponent implements OnInit, AfterViewInit {

  @ViewChild('rootwizard') el: ElementRef;


  constructor(private route: ActivatedRoute, private eventService: EventService, private sharedService: SharedService) {
    this.eventModal = new EventModal();
  }

  private sub: any;
  selectedDate;
  selectedAdvisorID;
  advisorData;
  eventModal;

  ngAfterViewInit() {
    $(this.el.nativeElement).bootstrapWizard();
  }



  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      this.selectedAdvisorID = params['id'];
      this.selectedDate = params['id2'];
      this.eventService.getAdvisorInfo(this.selectedAdvisorID).then(data => {
        this.advisorData = data;

      });

    });
  }

  createEvent() {
    let event = {
	"haveTuition": true,
    "subjects": "Ancient Language, Math, Programing",
    "strongAtSubjects": "Math",
    "weakAtSubjects": "Ancient Language",
    "attractionToSubjects": "Programing",
    "interest": "Sleep",
    "hobbies": "Read Novel",
    "diagnosticReason": "Some text here",
    "specialRemarks": "Some text here",
    "from": "2017-06-19T13:00:00+00:00",
    "to": "2017-06-19T14:00:00+00:00",
    "advisor": "59268cd00a8e5a3aad206440",
    "package": "592694d8d0d4ed44d64a90d8",
    "parents": [{
    	"relation": "Father",
	    "firstName": "John",
	    "lastName": "Doe",
	    "age": 45,
	    "proffesion": "Mechanic",
	    "email": "john.doe@gmail.com",
	    "mobilePhone": "8888888888",
	    "bestTimeToContact": "09.00"
    }],
    "child": {
    	"firstName": "Anna",
        "lastName": "Doe",
        "age": 12,
        "gender": "fille",
        "mobilePhone": "88888888888",
        "street": "61 Rue Avenue",
        "postcode": "75001",
        "city": "Paris 01",
        "birthplace": "Paris",
        "birthdate": "2003-01-01"
    }
  
}


    this.eventService.createEvent(event).subscribe(
      data => {        
        return true;
      },
      error => {        
        return Observable.throw(error);
      }
    );
  }
}