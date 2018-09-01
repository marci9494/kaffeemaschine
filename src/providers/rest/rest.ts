import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://192.168.178.105:5000';
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


    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/listBeverages').subscribe(data => {
        resolve(data);
      },
        err => {
          console.log("unbekannter fehler");
        });
    });
  }




  orderBeverage(id, userId) {
    //TODO Userid übergeben
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/orderBeverage?productID=' + id + '&userID=' + userId).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });

  }
  getOrderStatus(uuid) {
    try {
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/getStatus?uuid=aaae8023-3d93-4e99-800b-05e26491a234').subscribe(data => {
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

  getEstimatedTime(uuid) {
    try {
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/getEstimatedTime?uuid=' + uuid).subscribe(data => {
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
  deleteOrder(uuid) {
    try {
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '/deleteBeverage?uuid=' + uuid).subscribe(data => {
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
}
