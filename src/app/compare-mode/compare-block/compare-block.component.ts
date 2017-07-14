import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compare-block',
  templateUrl: './compare-block.component.html',
  styleUrls: ['./compare-block.component.scss']
})
export class CompareBlockComponent implements OnInit {

  @Input() schoolDataToDisplay;
  twoToFour : boolean;
  // fiveToEight : boolean;
  constructor() {}

  ngOnInit() {
    console.log(this.schoolDataToDisplay);
    this.twoToFour = this.schoolDataToDisplay.cycles[0].cycle.boarding['2to4'].value;
    // this.fiveToEight = this.schoolDataToDisplay.cycles[0].cycle.boarding['5to8'].element;
    console.log(JSON.stringify(this.twoToFour));
  }

  onDeleteCompare(){
    // console.log("click on detele img")
  }

}
