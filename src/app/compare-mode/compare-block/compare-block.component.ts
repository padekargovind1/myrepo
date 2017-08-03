import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CompareService } from '../../services/compare.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-compare-block',
  templateUrl: './compare-block.component.html',
  styleUrls: ['./compare-block.component.scss']
})
export class CompareBlockComponent implements OnInit, AfterViewInit {

  @Input() schoolDataToDisplay;
  compareListFilter : any;
  slickCounter: number = 0

  constructor(private compareService: CompareService) {}

  ngOnInit() {
    this.compareListFilter = this.compareService.getCompareFilter();
    // console.log(this.compareListFilter);
  }

  onDeleteCompare(){
    // console.log("click on detele img")
  }

  ngAfterViewInit(){
    (<any> $('.cycleSlick'+this.schoolDataToDisplay.counter)).slick({
      arrows: false,
    });
  }

}
