import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.component.html',
  styleUrls: ['./conseil.component.css']
})
export class ConseilComponent implements OnInit {

  constructor(private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit() {
  }

  navigateToBooking(){
    console.log("Navigate to booking")
    this.router.navigate( ['booking']);
  }

}
