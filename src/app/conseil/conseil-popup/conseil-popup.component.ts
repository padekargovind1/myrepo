import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef,MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-conseil-popup',
  templateUrl: './conseil-popup.component.html',
  styleUrls: ['./conseil-popup.component.scss']
})
export class ConseilPopupComponent implements OnInit {

  showPackage : number;

  constructor(public dialogref:MdDialogRef<ConseilPopupComponent>,
              @Inject(MD_DIALOG_DATA) private data: {conseilDesc : any}) { }

  ngOnInit() {
    console.log(this.data.conseilDesc);
    this.showPackage=this.data.conseilDesc;
  }

}
