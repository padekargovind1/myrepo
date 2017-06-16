import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../core/services/school.service';

@Component({
  selector: 'app-compare-mode',
  templateUrl: './compare-mode.component.html',
  styleUrls: ['./compare-mode.component.scss'],
  providers: [SchoolService]
})
export class CompareModeComponent implements OnInit {

  constructor(private schoolService: SchoolService, private route: ActivatedRoute) { }

  private sub: any;

  idsToCompare;
  fieldsToCompare;
  schoolsData;
  cycles;


  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.idsToCompare = params.id.substring(0, params.id.length - 1);
      this.fieldsToCompare = params.id2.substring(0, params.id2.length - 1);

        
          this.schoolService.compareSchools(this.idsToCompare,this.fieldsToCompare).then(data => {
          this.schoolsData=data;
          console.log(this.schoolsData);

        });



    })

  }
}

