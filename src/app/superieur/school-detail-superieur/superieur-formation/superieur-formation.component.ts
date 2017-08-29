import { Component, OnInit, Input } from '@angular/core';
import { PublicService } from '../../../services/public.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-superieur-formation',
  templateUrl: './superieur-formation.component.html',
  styleUrls: ['./superieur-formation.component.scss']
})
export class SuperieurFormationComponent implements OnInit {

  @Input() schoolDataRef;
  schoolDataToDisplay =[];
  subscription : Subscription;
  schoolData=[];
  schoolId = "";
  constructor(private publicService : PublicService,
              private route : ActivatedRoute) { 
    
  }

  ngOnInit() {
    setTimeout(()=>{
      console.log(this.schoolDataRef);
	  if(this.schoolDataRef!==undefined && this.schoolDataRef!=null && this.schoolDataRef.courses!==undefined && this.schoolDataRef.courses!=null)
	  {
		  for(let i = 0; i<this.schoolDataRef.courses.length; i++){
			this.schoolDataToDisplay.push(this.schoolDataRef.courses[i])
		  }
	  }
      console.log(this.schoolDataToDisplay)
    }, 500)
  }

}
