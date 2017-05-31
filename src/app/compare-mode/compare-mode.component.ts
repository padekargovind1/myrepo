import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compare-mode',
  templateUrl: './compare-mode.component.html',
  styleUrls: ['./compare-mode.component.scss']
})
export class CompareModeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

   private sub: any;

  ngOnInit() {

      this.sub = this.route.params.subscribe(params => {
      console.log(params);
      


      })

}
}

