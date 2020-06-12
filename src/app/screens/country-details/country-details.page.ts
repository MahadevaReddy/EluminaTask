import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
})
export class CountryDetailsPage implements OnInit {
  id: any;
  details: any = {};
  constructor(private activatedRoute: ActivatedRoute, private db: DatabaseService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.db.getCountry(this.id).then((res) => {
      console.log(JSON.stringify(res));
      this.details = res[0];
    });
  }

}
