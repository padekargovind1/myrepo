import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  constructor(private route: ActivatedRoute){}
  
  ngOnInit(){
    console.log(this.route.url.subscribe(
      (data) =>{
        console.log(data);
      }
    ));
    // if (this.route.url==''){

    // }
  }
}
