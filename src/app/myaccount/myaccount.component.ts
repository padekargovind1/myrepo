import { Component, OnInit , Output, EventEmitter} from '@angular/core';

import { MyAccountParentMdl, 
        MyAccountAdresse } from '../model/myaccount.model';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }
}
