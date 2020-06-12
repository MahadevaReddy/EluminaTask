import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { RestService } from '../../rest.service';
import { DatabaseService } from '../../services/database.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  totalCountriesList: any = [];
  renderList: any = [];
  paginationList: any = [];
  constructor(private restService: RestService, private db: DatabaseService) {
    this.getAllCountriesList();
  }

  async getAllCountriesList() {
    this.renderList = [];
    this.totalCountriesList = [];
    await this.restService.getAllCountries().subscribe((res) => {
      this.totalCountriesList = res;
      this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.db.loadCountries().then((data) => {
            if (data.length === 0) {
              for (let i = 0; i < this.totalCountriesList.length; i++) {
                this.db.addCountries(this.totalCountriesList[i]);
              }
              this.getCountries();
            } else {
              this.getCountries();
            }
          });
        }
      });
    }, (error) => {
      this.getCountries();
    });
  }

  async getCountries() {
    this.paginationList = [];
    this.renderList = [];
    await this.db.loadCountries().then((countries) => {
      this.renderList = countries;
      for (let i = 0; i < 10; i++) {
        const element = this.renderList[i];
        this.paginationList.push(element);
      }
    });
  }
  loadData(event) {
    setTimeout(() => {
      const index = this.paginationList.length;
      for (let i = index; i < index + 10; i++) {
        console.log(i);
        const element = this.renderList[i];
        this.paginationList.push(element);
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

  doRefresh(event) {
    console.log('Begin async operation');
    this.getAllCountriesList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
  }

}
