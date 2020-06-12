import { Component, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  totalCountriesList: any = [];
  renderList: any = [];
  constructor(private restService: RestService) {
    this.restService.getAllCountries().subscribe((res) => {
      this.totalCountriesList = res;
      for (let i = 0; i < 10; i++) {
        const element = this.totalCountriesList[i];
        this.renderList.push(element);
      }
    });
  }

  loadData(event) {
    setTimeout(() => {
      const index = this.renderList.length - 1;
      for (let i = index; i < index + 10; i++) {
        console.log(i);
        const element = this.totalCountriesList[i];
        this.renderList.push(element);
      }

      console.log('Done');
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (this.totalCountriesList.length > 100) {
      //   event.target.disabled = true;
      // }
    }, 2000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  ionViewWillEnter(){}
}
