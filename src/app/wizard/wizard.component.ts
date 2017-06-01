import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers: [EventService]
})
export class WizardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

   private sub: any;

  selectedDate;
  selectedAdvisorID;

  ngOnInit() {

      this.sub = this.route.params.subscribe(params => {
      this.selectedAdvisorID = params['id'];
      this.selectedDate= params['id2'];

      this.eventService.getAdvisorData(this.selectedAdvisorID).then(events => {
      var str = JSON.stringify(events);
      str = str.replace(/from/g, 'start');
      str = str.replace(/to/g, 'end');
      //this.events = JSON.parse(str);
      //this.selectedAdvisor = advisorName;
      //this.selectedAdvisorID=advisorID;
    });
    
    });

}
}

