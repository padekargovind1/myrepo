import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

   private sub: any;

  ngOnInit() {

      this.sub = this.route.params.subscribe(params => {
      console.log(params);
      


      })

}
}

