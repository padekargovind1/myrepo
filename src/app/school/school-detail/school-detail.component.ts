import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../core/services/school.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: [
    './school-detail.component.scss',
    '../../../assets/APB PRIVE - ETABLISSEMENT_files/owl.carousel.css',
    '../../../assets/APB PRIVE - ETABLISSEMENT_files/owl.theme.css',
    '../../../assets/APB PRIVE - ETABLISSEMENT_files/owl-carousel-apb.css',
    '../../../assets/APB PRIVE - ETABLISSEMENT_files/bootstrap-social.css',
    '../../../assets/APB PRIVE - ETABLISSEMENT_files/animate.css',
    '../../../assets/APB PRIVE - ETABLISSEMENT_files/style.css',
    '../../../assets/APB PRIVE - ETABLISSEMENT_files/box-shadow.css',


  ],
  providers: [SchoolService]
})
export class SchoolDetailComponent implements OnInit {

schoolData;
schoolID;
private sub: any;

  constructor(private schoolService: SchoolService, private route: ActivatedRoute) {
this.route.params.subscribe(params => {
      this.schoolID = params['id'];
    });

   }

  ngOnInit() {      

   this.schoolService.getSchoolDetailByID(this.schoolID).then((data) => {
            //this.totalSchools=data.total;
            this.schoolData = data;
            console.log(this.schoolData);
        });
  }
}