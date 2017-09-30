import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { PublicService } from '../services/public.service';
import { BookingService } from '../services/booking.service';
import { CompareService } from '../services/compare.service';
import { WishApplyPopupComponent } from './wish-apply-popup/wish-apply-popup.component';
import 'rxjs/add/operator/filter';
//import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import {HelperService} from "../services/helper.service";

//var self = this;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  //Title : String = "Ma Recherche";

  userLogin : boolean = false;
  //userApplication : any;
  //schoolApply = [];
  //schoolWish = [];
  wishCount = 0;
  applyCount = 0;
  //userLastName : string = "";
  userFirstName: string = "";
  userFirstNameMobile: string = "";
  wishList= [];
  onMobile:boolean=false;
  isLandingPage:boolean = false;
  //subscription : Subscription

  config: any;

  constructor(private router : Router,
              private authService : AuthService,
              private usersService : UsersService,
              private publicService : PublicService,
              private bookingService : BookingService,
              private compareService : CompareService,
              public dialog:MdDialog,
              private route : ActivatedRoute,
              private helperService : HelperService) {}

  // Getting the user data and the list of the application
  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        // console.log(event);

        let currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
          currentRoute = currentRoute.children[0];
        }
        //console.log(currentRoute.routeConfig.path);
        var pathname = currentRoute.routeConfig.path;
        this.isLandingPage = pathname.indexOf("landing-page")>=0;

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

  // Run the script
  runScript(){
    var self = this;
    $('.mobile-login').on('click', '.fa-user', function() {
        $('.login').toggle('slow');
    });
    var checkMobile = self.helperService.detectmob();
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

    if(self.onMobile){
      $(document).on('click', '.menu-holder', function(){
        console.log("test")
      if($('.submenutBt').css('visibility')=='visible'){
        $('.submenutBt').css({'opacity': '0','visibility': 'hidden','-moz-transform': 'scaleY(0)','-webkit-transform': 'scaleY(0)','-o-transform': 'scaleY(0)','-ms-transform': 'scaleY(0)','transform': 'scaleY(0)'});

      }else{
        $('.submenutBt').css({'opacity': '1','visibility': 'visible','-moz-transform': 'scaleY(1)','-webkit-transform': 'scaleY(1)','-o-transform': 'scaleY(1)','-ms-transform': 'scaleY(1)','transform': 'scaleY(1)'});
      }

      });
	  $('*').click(function(e){
      var a = e.target;
      if ($(a).parents('.main-navigation').length === 0) {
        $('.submenutBt').css({'opacity': '0','visibility': 'hidden','-moz-transform': 'scaleY(0)','-webkit-transform': 'scaleY(0)','-o-transform': 'scaleY(0)','-ms-transform': 'scaleY(0)','transform': 'scaleY(0)'});
      }
    });
    }

    $('body').on('click', function($event){
      // console.log(event)
	  if(event!==undefined && event.srcElement!==undefined)
	  {
		  if(event.srcElement.className=='fa fa-bookmark' || event.srcElement.className=='btn btn-success btn-outline btn-sm '){
        setTimeout(function(){
          self.getApplication()
        }, 1000)
		  }
    }
  });

	// setInterval(()=>{
	// 	if(this.userLogin){ this.getApplication(); }
	// },2000);
  }

  // get the user Name to display it in the right
  getUserName(){
    this.usersService.getProfile()
      .subscribe(
        (response)=>{
          console.log(response.data[0]);
          let data = response.data[0];
          this.userFirstName = data.firstName;
          this.userFirstNameMobile = data.firstName.trim() != "" ? " (" + data.firstName.trim() + ")" : "";
          // this.userLastName = data.lastName;
        }
      )
  }

  // Cleaning the local storage
  // Navigate home page
  onNavigateHome(){
    this.cleanLocalStorage();
	  this.hideHeaderSubMenus();
    this.router.navigate( ['/'] );
  }

  //After click on Sign up button
  onSignUp(){
	  this.hideHeaderSubMenus();
    this.router.navigate(['/register']);
  }

  //After click on Sign in button
  onSignIn(){
	  this.hideHeaderSubMenus();
    this.router.navigate(['/login']);
  }

  // Navigate to an url
  navigateToURL(url){
	  this.hideHeaderSubMenus();
    this.router.navigate([url]);
  }

  // After sign out
  // Log out the user
  // Reset all the local storage
  onSignOut(){
	  this.hideHeaderSubMenus();
    this.cleanLocalStorage();
    this.authService.logout();
    this.userLogin=false;
    this.router.navigate(['/']);
    //console.log(this.authService.getToken())
    this.wishCount = 0;
    this.applyCount = 0;
  }

  // Getting the applications -> wish and apply
  getApplication(){
    console.log("test1")
    this.usersService.getApplication()
      .subscribe(
        response => {
          //  console.log(response)
          if(response.code==400){
            console.log(response.message);
          } else {
            // console.log(response.data)
            this.wishList=response.data;
            var wcount = 0;
            var acount=0;
            for(let data of response.data){
              if(data.type=='wish'){
                wcount++;
              } else {
                acount++;
              }
            }
            this.wishCount = wcount;
            this.applyCount = acount;
          }
        }
      )
  }

  // getSchoolsData(){
  //   for(let school of this.userApplication){
  //     this.publicService.getSchoolById(school)
  //       .subscribe(
  //         (response)=>{
  //           let data = response.data;
  //           console.log(data);
  //           if(response.code==400){
  //             console.log(response.message)
  //           } else {
  //             if(data.type=="wish"){
  //               this.schoolWish.push(data);
  //             } else {
  //               this.schoolApply.push(data);
  //             }
  //           }
  //         }
  //       )
  //   }
  // }

  // onSchoolDetail(schoolId){
  //   this.router.navigate(['/etablissement', schoolId]);
  // }

  // onApplyTo(schoolId){
  //   this.router.navigate(['/applyto', schoolId]);
  // }

  // After click on my account (name is user name)
  onMyAccount(nb){
	this.hideHeaderSubMenus();
    this.cleanLocalStorage();
    if(this.userLogin){
      this.usersService.storeTabNb(nb)
      this.router.navigate(['/my-account']);
    }
  }

  // Clean the local storage in services
  cleanLocalStorage(){
    this.bookingService.cleanBooking();
    this.compareService.cleanCompareFilter();
    this.compareService.cleanSchoolCompare();
  }

  // Make the config of the md Dialog
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

  // Open the dialog of the wish list
  // If not log in -> navigate to login page
  wishApplyDialog(nb : number){
    if(this.userLogin){
      this.makeProfile(nb)
      this.dialog.open(WishApplyPopupComponent,this.config);
      // dialogref.afterClosed().subscribe(result => {
      //   console.log(result)
      // });
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Cleaning the landing num after destroy (after quit the website)
  ngOnDestroy(){
    this.publicService.cleanNumLanding();
  }

  // Hiding the menu (on mobile)
  hideHeaderSubMenus(){
    console.log(this.onMobile);
    if(this.onMobile){
      $('.submenutBt').css({'opacity': '0','visibility': 'hidden','-moz-transform': 'scaleY(0)','-webkit-transform': 'scaleY(0)','-o-transform': 'scaleY(0)','-ms-transform': 'scaleY(0)','transform': 'scaleY(0)'});
	  //$('header .main-navigation li.courses-menu').trigger('mouseout');
      $('.login').hide();
    }
  }

  // if on mobile and if user want the "guide interactif" -> sweet alert b'cause guide is not supported on mobile
  onMobileGuide(){
    swal({
      title: "CIDE",
      text: 'Désolé, notre guide intéractif n\'est pas disponible sur les appareils mobiles.',
      type: 'warning',
      confirmButtonText: "J'AI COMPRIS"
    })
    this.router.navigate(['/']);
  }

}
