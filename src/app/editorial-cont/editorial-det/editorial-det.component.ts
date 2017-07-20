import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editorial-det',
  templateUrl: './editorial-det.component.html',
  styleUrls: ['./editorial-det.component.scss']
})
export class EditorialDetComponent implements OnInit {

   editorialnews : any;

  constructor() { }

  ngOnInit() {
  
   this.fetch((data) => {
      this.editorialnews = data;
      
    });
     console.log("cek data",this.editorialnews);
     
  }
  
  fetch(cb) {
    const req = new XMLHttpRequest();
   req.open('GET', `assets/json/editorial.json`);
   req.onload = () => {
      cb(JSON.parse(req.response));
    };

   req.send();
  }
}
