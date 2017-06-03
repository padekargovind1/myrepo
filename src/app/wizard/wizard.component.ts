import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { EventModal} from '../models/events.modal';
import { SharedService } from '../services/shared.service';
import {Observable} from 'rxjs/Rx';



@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers: [EventService]
})
export class WizardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private eventService: EventService,private sharedService: SharedService)   
  {   
    this.eventModal=new EventModal();
   }

  private sub: any;
  selectedDate;
  selectedAdvisorID;
  advisorData;
  eventModal;
  

  
  ngOnInit() {

      this.sub = this.route.params.subscribe(params => {
      this.selectedAdvisorID = params['id'];
      this.selectedDate= params['id2'];
      this.eventService.getAdvisorInfo(this.selectedAdvisorID).then(data => {  
      this.advisorData=data;
     
    });
    
  });  

        

  ///console.log(this.sharedService.selectedPackageID);


}

createEvent()
{
  let event = {
    
    "from": "2017-05-29T13:00:00+00:00",
     "to": "2017-05-29T14:00:00+00:00", 
     "advisor": "59268cd00a8e5a3aad206440",
     "package": "592694d8d0d4ed44d64a90d8",
    
  }



    this.eventService.createEvent(event).subscribe(
       data => {
 
         //this.getFoods();
         return true;
       },
       error => {
         console.error("Error saving food!");
         return Observable.throw(error);
       }
    );
}


}