import { Component, OnInit, Input } from '@angular/core';
import { PublicService } from '../../services/public.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-etablissement-formation',
  templateUrl: './etablissement-formation.component.html',
  styleUrls: ['./etablissement-formation.component.scss']
})
export class EtablissementFormationComponent implements OnInit {
  @Input() schoolDataRef;
  schoolDataToDisplay =[];
  subscription : Subscription;
  schoolData=[];
  schoolId = "";
  constructor(private publicService : PublicService,
              private route : ActivatedRoute) {

  }

  // Display the different cycles data for one school
  ngOnInit() {
    setTimeout(()=>{
      console.log(this.schoolDataRef);
	  if(this.schoolDataRef!==undefined && this.schoolDataRef!=null && this.schoolDataRef.cycles!==undefined && this.schoolDataRef.cycles!=null)
	  {
		  for(let i = 0; i<this.schoolDataRef.cycles.length; i++){
			this.schoolDataToDisplay.push(this.schoolDataRef.cycles[i])
		  }
	  }
      console.log(this.schoolDataToDisplay)
    }, 500)
  }

}
