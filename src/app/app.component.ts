import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
//import { globalUrl } from './common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
    constUrl:any;
    constructor(private router: Router) {

        router.events.subscribe(event => {

            if (event instanceof NavigationEnd ) {
                this.constUrl = event.url;
               
              console.log("current url",event.url); // event.url has current url
              // your code will goes here
            }
          });

     }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

}
