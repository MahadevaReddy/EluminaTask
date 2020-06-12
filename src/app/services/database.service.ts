import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
export interface Dev {
  id: number;
  name: string;
  skills: any[];
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  countries = new BehaviorSubject([]);
  load = true;
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'countries.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          db.executeSql(
            'CREATE TABLE IF NOT EXISTS Countries(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,topLevelDomain TEXT,alpha2Code TEXT, alpha3Code TEXT, callingCodes NUMBER, capital TEXT, altSpellings TEXT, region TEXT, subregion TEXT, population NUMBER, latlng TEXT, demonym TEXT, area NUMBER, gini REAL, timezones TEXT, borders TEXT, numericCode TEXT, nativeName TEXT, flag TEXT, cioc TEXT)', [])
            .then(() => {
              //this.addCountries();
            })
            .catch(e => console.log(e));
          this.dbReady.next(true);
        }).catch(e => console.log(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }


  loadCountries() {
    return this.database.executeSql('SELECT * FROM Countries', []).then(data => {
      const countries: any = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          countries.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            topLevelDomain: this.splitArray(data.rows.item(i).topLevelDomain),
            alpha2Code: data.rows.item(i).alpha2Code,
            alpha3Code: data.rows.item(i).alpha3Code,
            callingCodes: data.rows.item(i).callingCodes,
            capital: data.rows.item(i).capital,
            altSpellings: this.splitArray(data.rows.item(i).altSpellings),
            region: data.rows.item(i).region,
            subregion: data.rows.item(i).subregion,
            population: data.rows.item(i).population,
            latlng: this.splitArray(data.rows.item(i).latlng),
            demonym: data.rows.item(i).demonym,
            area: data.rows.item(i).area,
            gini: data.rows.item(i).gini,
            timezones: data.rows.item(i).timezones,
            borders: this.splitArray(data.rows.item(i).borders),
            nativeName: data.rows.item(i).nativeName,
            numericCode: data.rows.item(i).numericCode,
            flag: data.rows.item(i).flag,
            cioc: data.rows.item(i).cioc,
           });
        }
      }
      return countries;
    });
  }

  splitArray(strng){
    if (strng.includes(',')){
      return strng.split(',');
    }else {
      return strng;
    }
  }

  async addCountries(country) {
    console.log('Add Countries databse!!!');
    const data = [country.name, country.topLevelDomain.toString(), country.alpha2Code, country.altSpellings, country.callingCodes, country.capital, country.altSpellings.toString(), country.region, country.subregion, country.population, country.latlng.toString(), country.demonym, country.area, country.gini, country.timezones, country.borders.toString(), country.nativeName, country.numericCode, country.flag, country.cioc];
    return await this.database.executeSql(
      'INSERT or IGNORE INTO Countries (name, topLevelDomain, alpha2Code, alpha3Code, callingCodes, capital, altSpellings, region, subregion, population, latlng, demonym, area, gini, timezones, borders, nativeName, numericCode, flag, cioc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data)
      .then(() => {
        this.load = false;
      }
    );
  }

  async getCountry(id) {
    return await this.database.executeSql('SELECT * FROM Countries WHERE id = ?', [id]).then(data => {
      const countries: any = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          countries.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            topLevelDomain: data.rows.item(i).topLevelDomain,
            alpha2Code: data.rows.item(i).alpha2Code,
            alpha3Code: data.rows.item(i).alpha3Code,
            callingCodes: data.rows.item(i).callingCodes,
            capital: data.rows.item(i).capital,
            altSpellings: data.rows.item(i).altSpellings,
            region: data.rows.item(i).region,
            subregion: data.rows.item(i).subregion,
            population: data.rows.item(i).population,
            latlng: data.rows.item(i).latlng,
            demonym: data.rows.item(i).demonym,
            area: data.rows.item(i).area,
            gini: data.rows.item(i).gini,
            timezones: data.rows.item(i).timezones,
            borders: data.rows.item(i).borders,
            nativeName: data.rows.item(i).nativeName,
            numericCode: data.rows.item(i).numericCode,
            flag: data.rows.item(i).flag,
            cioc: data.rows.item(i).cioc,
           });
        }
      }
      return countries;
    });
  }
}
