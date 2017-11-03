import { Component, OnInit } from '@angular/core';
import {HelperService} from "../services/helper.service";

@Component({
  selector: 'app-detail-appointment',
  templateUrl: './detail-appointment.component.html',
  styleUrls: ['./detail-appointment.component.scss']
})
export class DetailAppointmentComponent implements OnInit {

  constructor(public helperService : HelperService) { }

  ngOnInit() {
  }

}
