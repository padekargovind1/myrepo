import { Component, OnInit, Input } from '@angular/core';
import { CompareService } from '../../services/compare.service';

@Component({
  selector: 'app-compare-block',
  templateUrl: './compare-block.component.html',
  styleUrls: ['./compare-block.component.scss']
})
export class CompareBlockComponent implements OnInit {

  @Input() schoolDataToDisplay;
  compareListFilter : any;

  constructor(private compareService: CompareService) {}

  ngOnInit() {
    this.compareListFilter = this.compareService.getCompareFilter();
    // console.log(this.compareListFilter);
  }

  onDeleteCompare(){
    // console.log("click on detele img")
  }

}
