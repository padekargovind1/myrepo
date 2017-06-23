import { Component, OnInit } from '@angular/core';
import { UnConseilService } from '../../core/services/un-conseil.service';


@Component({
  selector: 'app-un-conseil',
  templateUrl: './un-conseil.component.html',
  styleUrls: ['./un-conseil.component.scss'],
  providers: [UnConseilService]
})
export class UnConseilComponent implements OnInit {

  packageData:any;


  constructor(private UnConseilService: UnConseilService) { }

  ngOnInit() {
    this.UnConseilService.getData().subscribe((data) => {
      this.packageData = data.data;
    });
  }
}