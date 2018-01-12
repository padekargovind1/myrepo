import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { PublicService } from '../services/public.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-applyto',
  templateUrl: './applyto.component.html',
  styleUrls: ['./applyto.component.scss']
})
export class ApplytoComponent implements OnInit {

  activeTabIndex = 0;
  subscription : Subscription;
  schoolId="";
  userData:any;
  schoolName : string ="";
  schoolLogo : string ="";
  canDisplayApply : boolean = false;
  parents : any;
  @ViewChild('tabGroup') tabGroup;
  nbTab : number=0;

  constructor(private usersService: UsersService,
              private authService : AuthService,
              private publicService : PublicService,
              private route : Router,
              private router : ActivatedRoute,
              private cdr: ChangeDetectorRef) {

                this.subscription = this.router.params
                  .subscribe(
                    params => {
                      if(params.hasOwnProperty('schoolId')){
                        this.schoolId=params['schoolId'];
                        this.getSchoolDataById();
                        this.getUserProfile();
                      }
                    }
                  )
              }

  // Check if user is logged, otherwise we load the script
  ngOnInit() {
    if(!this.authService.isUserLoggedIn()){
      swal({
        title: 'Attention',
        text: 'Vous devez être connecté afin de prendre un rendez-vous.',
        type: 'warning',
        confirmButtonText: 'Ok'
      })
      this.route.navigate(['/login']);
    }
    this.loadScript('assets/js/select2.min.js');
  }

  // Load script
  loadScript(url) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  // Get the school Data
  getSchoolDataById(){
    this.publicService.getSchoolById(this.schoolId)
      .subscribe(
        (data) => {
          let response = data;
          console.log('loggin school data..');
          console.log(response);
          if (response.code==400){
            console.log(response.message);
          }else {
            this.schoolName = response.data.longName;
            this.schoolLogo = response.data.cycles[0].logo1
          }
        }
      )
  }

  //Get user profile data
  //Then call methods to build the form and patch value
  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (response)=>{
          let data = response.data;
          // console.log(data);
          if(response.code==400){
            console.log(response.message);
          } else {
            this.userData = data[0];
            console.log(this.userData);
            this.canDisplayApply=true;
          }
        }
      )
  }

  //navigate to the different tab of the md-tab
  nextTab(nb){
    this.tabGroup.selectedIndex=nb;
    this.nbTab=nb;
    this.cdr.detectChanges();
  }
}
