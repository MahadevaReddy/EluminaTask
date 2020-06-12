import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() details: any;
  constructor() { }

  ngOnInit() {
    console.log(JSON.stringify(this.details));
  }

  checkUrl(data){
    return data.includes('http') ? true : false;
  }

}
