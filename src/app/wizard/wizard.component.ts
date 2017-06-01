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

  constructor(private route: ActivatedRoute) { }

   private sub: any;

  selectedDate;
  selectedAdvisorID;

  ngOnInit() {

      this.sub = this.route.params.subscribe(params => {
      this.selectedAdvisorID = params['id'];
      this.selectedDate= params['id2'];
    
    });

}
}

