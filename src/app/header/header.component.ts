import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { PublicService } from '../services/public.service';
import { BookingService } from '../services/booking.service';
import { CompareService } from '../services/compare.service';
import { WishApplyPopupComponent } from './wish-apply-popup/wish-apply-popup.component';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';

var self = this;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  Title : String = "Ma Recherche";

  userLogin : boolean = false;
  userApplication : any;
  schoolApply = [];
  schoolWish = [];
  wishCount = 0;
  userLastName : string = "";
  userFirstName : string = "";
  wishList= [];
  onMobile:boolean=false;
  subscription : Subscription

  config: MdDialogConfig;

  constructor(private router : Router,
              private authService : AuthService,
              private usersService : UsersService,
              private publicService : PublicService,
              private bookingService : BookingService,
              private compareService : CompareService,
              public dialog:MdDialog,
              private route : ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        // console.log(event);
        this.userLogin=this.authService.isUserLoggedIn();
        if(this.userLogin){
          this.getUserName();
          this.getApplication();
          //this.getSchoolsData();
        }
      });
    this.runScript();
  }
  openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
  
  closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "white";
    }

  runScript(){
    $('.mobile-login').on('click', '.fa-user', function() {
        $('.login').toggle('slow');
    });
     function detectmob() {
        if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         ){
            return true;
        }
        else {
            return false;
        }
    }
    var checkMobile = detectmob();
    if (checkMobile) {
      console.log(checkMobile)
      self.onMobile=true;
      $('.select-all-advisor').on('click', function() {
          $(this).hide();
          $('.deselect-all-advisor').show();
      });
      $('.deselect-all-advisor').on('click', function() {
          $(this).hide();
          $('.select-all-advisor').show();
      });
    }else {
      self.onMobile=false;
    }
	
	var winWidth = $(window).width();
	
	if(winWidth < 767){
	//alert('sdf');
		$('.courses-menu .menu-holder').click(function(){
		if($('.submenutBt').css('visibility')=='visible'){
			$('.submenutBt').css({'opacity': '0','visibility': 'hidden','-moz-transform': 'scaleY(0)','-webkit-transform': 'scaleY(0)','-o-transform': 'scaleY(0)','-ms-transform': 'scaleY(0)','transform': 'scaleY(0)'});
			
		}else{
			$('.submenutBt').css({'opacity': '1','visibility': 'visible','-moz-transform': 'scaleY(1)','-webkit-transform': 'scaleY(1)','-o-transform': 'scaleY(1)','-ms-transform': 'scaleY(1)','transform': 'scaleY(1)'});
		}
			
		});
	}
	
	
  }

  getUserName(){
    this.usersService.getProfile()
      .subscribe(
        (response)=>{
          // console.log(response.data[0]);
          let data = response.data[0];
          this.userFirstName = data.firstName;
          // this.userLastName = data.lastName;
        }
      )
  }

  onNavigateHome(){
    this.cleanLocalStorage()
    this.router.navigate( ['/'] );
  }

  onSignUp(){
    this.router.navigate(['/register']);
  }

  onSignIn(){
    this.router.navigate(['/login']);
  }

  onSignOut(){
    this.cleanLocalStorage();
    this.authService.logout();
    this.userLogin=false;
    this.router.navigate(['/']);
  }

  getApplication(){
    this.usersService.getApplication()
      .subscribe(
        response => {
           //console.log(response.data.length)
          if(response.code==400){
            console.log(response.message);
          } else {
            // console.log(response.data)
            this.wishList=response.data;
			this.wishCount = this.wishList.length;
          }
        }
      )
  }

  getSchoolsData(){
    for(let school of this.userApplication){
      this.publicService.getSchoolById(school)
        .subscribe(
          (response)=>{
            let data = response.data;
            console.log(data);
            if(response.code==400){
              console.log(response.message)
            } else {
              if(data.type=="wish"){
                this.schoolWish.push(data);
              } else {
                this.schoolApply.push(data);
              }
            }
          }
        )
    }
  }

  onSchoolDetail(schoolId){
    this.router.navigate(['/etablissement', schoolId]);
  }

  onApplyTo(schoolId){
    this.router.navigate(['/applyto', schoolId]);
  }

  onMyAccount(nb){
    this.cleanLocalStorage();
    if(this.userLogin){
      this.usersService.storeTabNb(nb)
      this.router.navigate(['/my-account']);
    }
  }

  cleanLocalStorage(){
    this.bookingService.cleanBooking();
    this.compareService.cleanCompareFilter();
    this.compareService.cleanSchoolCompare();
  }

  makeProfile(tabNbSelected : number){
    this.config = {
      data:{
          tabNb : tabNbSelected
      },
      disableClose: false,
      width: '300',
      height: '500',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }
    }
  }

  wishApplyDialog(nb : number){  
    this.makeProfile(nb)
    let dialogref = this.dialog.open(WishApplyPopupComponent,this.config);
    // dialogref.afterClosed().subscribe(result => {
    //   console.log(result)
    // });
  }

  ngOnDestroy(){
    this.publicService.cleanNumLanding();
  }

}
