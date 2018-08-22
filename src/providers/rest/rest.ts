import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://localhost:5000';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  getStatus() {
    try {
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/getStatus').subscribe(data => {
          resolve(data);
        },
          err => {
            console.log(err);
          });
      });
    } catch (err) {
      return null;
    }
  }
  listBeverages() {
    try {
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/listBeverages').subscribe(data => {
          resolve(data);
        },
          err => {
            console.log(err);
          });
      });

    } catch (err) {
      return null;
    }
  }

  orderBeverage(id, userId) {
    //TODO Userid übergeben
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/orderBeverage?productID=' + id).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
          return null;
        });
    });
  }

}
