import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-school-card',
  templateUrl: './school-card.component.html',
  styleUrls: ['./school-card.component.scss']
})
export class SchoolCardComponent implements OnInit {

  @Input() SchoolData : any;

  constructor() { }

  ngOnInit() {
    console.log(this.SchoolData);
  }

}
