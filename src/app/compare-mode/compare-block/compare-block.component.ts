import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
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
  whichCycle : number = 0;
  @Output('updateCycle') cycleChange : EventEmitter<any> = new EventEmitter<number>();
  // slickCounter: number = 0

  constructor(private compareService: CompareService) {}

  ngOnInit() {
    this.compareListFilter = this.compareService.getCompareFilter();
    // console.log(this.compareListFilter);
  }

  onDeleteCompare(){
    // console.log("click on detele img")
  }

  ngAfterViewInit(){
    // (<any> $('.cycleSlick'+this.schoolDataToDisplay.counter)).slick({});
  }

  cycleChanging(event){
    // console.log(event.srcElement.selectedIndex)
    this.whichCycle=event.srcElement.selectedIndex
    // this.whichCycle=nb
  }

}
