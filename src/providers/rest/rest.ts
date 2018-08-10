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
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getStatus').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }
    listBeverages() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/listBeverages').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  orderBeverage(id,userId) {
    return this.http.get(this.apiUrl + '/orderBeverage?id=' + id + '&userID='+userId);
    
//    return new Promise(resolve => {
//      this.http.get(this.apiUrl + '/orderBeverage?id=' + id + '&userID='+userId).subscribe(data => {
//        resolve(data);
//      },
//        err => {
//          console.log(err);
//        });
//    });
  }

}
