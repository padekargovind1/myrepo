import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { CompareService } from '../../services/compare.service';

@Component({
  selector: 'app-compare-dialog',
  templateUrl: './compare-dialog.component.html',
  styleUrls: ['./compare-dialog.component.scss']
})
export class CompareDialogComponent implements OnInit {

  canFilter: boolean = false;
  compareList = [];
  compareListFilter = [];
  filterList = ['Cycles & Classes', 'Langues', 'Spécialités',
  'Internat', 'Stages', 'Restauration',
  'Externat', 'Statut', 'Enseignement Confessionel',
  'Sections', 'Diplôme', 'Options', 'Places Disponibles']

  constructor(private router: Router,
              private compareService: CompareService,
              public dialogref: MdDialogRef<CompareDialogComponent>,
              @Inject(MD_DIALOG_DATA) private data: {schoolData : any}) { }

  ngOnInit() {
    console.log(this.data);
    this.compareList = this.data.schoolData;
    // When user want to compare schools, he got a modal with multiple checkbox
    // Init at false. Array will be send to the compare mode page to know which category he want to compare
    for (let list of this.filterList){
      this.compareListFilter.push(false);
    }
  }

  // when user click on a checkbox to select category to compare the schools
  onFilterCheckbox(index) {
    this.compareListFilter[index] = !this.compareListFilter[index];
    this.canFilter = this.checkFilterBox();
  }
  checkFilterBox() {
      let i = 0;
      for (const filter of this.compareListFilter) {
          if (filter) {
              return true;
          }
          i++;
      }
      return false;
  }

  onCompare() {
    this.dialogref.close();
    this.compareService.storeCompareFilter(this.compareListFilter);
    this.compareService.storeSchoolId(this.compareList);
    this.router.navigate(['compare-mode']);
  }

}
