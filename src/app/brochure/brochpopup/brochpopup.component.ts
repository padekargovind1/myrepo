import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-brochpopup',
  templateUrl: './brochpopup.component.html',
  styleUrls: ['./brochpopup.component.scss']
})
export class BrochpopupComponent implements OnInit {

  
  constructor(public dialogref:MdDialogRef<BrochpopupComponent>) { }

  ngOnInit() {
    
  }

}
