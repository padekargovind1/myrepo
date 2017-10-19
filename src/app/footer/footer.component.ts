import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

//var self = this;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router : Router,
              private route : ActivatedRoute) {}

  // Getting the user data and the list of the application
  ngOnInit() {
    
  }

  onNavigate(path) {
      this.router.navigate(['/' + path]);
  }
  
}
