import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etablissement-video',
  templateUrl: './etablissement-video.component.html',
  styleUrls: ['./etablissement-video.component.scss']
})
export class EtablissementVideoComponent implements OnInit {

  @Input() schoolData : any;
  constructor() { }

  ngOnInit() {
  }

}
