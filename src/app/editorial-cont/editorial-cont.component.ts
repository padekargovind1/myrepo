import { Component, OnInit } from '@angular/core';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-editorial-cont',
  templateUrl: './editorial-cont.component.html',
  styleUrls: ['./editorial-cont.component.scss']
})
export class EditorialContComponent implements OnInit {

  editorial : any;
  constructor(private editorService : EditorService) { 
    this.fetch((data) => {
      this.editorial = data;
      console.log(data);
    });
  }

  ngOnInit() {
    // this.getData();
  }

  getData(){
    this.editorService.getEditorialData()
      .subscribe(
        (response)=>{
          console.log(response);
        }
      )
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
