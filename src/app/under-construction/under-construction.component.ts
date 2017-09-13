import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PublicService } from '../services/public.service';
import * as $ from 'jquery';
import swal from 'sweetalert2';


@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.css']
})
export class UnderConstructionComponent implements OnInit {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private publicService: PublicService,
              private fb: FormBuilder
              ) {
  }

  ngOnInit() {

  }
}
