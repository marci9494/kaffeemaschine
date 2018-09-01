import {HttpParams} from "@angular/common/http";
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
   public apiUrl = 'http://192.168.179.105:5000'
  constructor(private nativeHttp: HTTP) {
    console.log('Hello RestProvider Provider');
  }
  getStatus() {
    //    try {
    //      return new Promise(resolve => {
    //        this.http.get(this.apiUrl + '/getStatus').subscribe(data => {
    //          resolve(data);
    //        },
    //          err => {
    //            console.log(err);
    //          });
    //      });
    //    } catch (err) {
    //      return null;
    //    }
  }
  listBeverages() {
    this.nativeHttp.get('http://localhost:5000/listBeverages', {}, {}).then((data) => {
      console.log('alles sehr komisch!');
      return data;
    });
    //    this.nativeHttp.get(this.apiUrl + '/listBeverages', {}, {})
    //      .then(data => {
    //        console.log("erfolgreich!");
    //        console.log(data);
    //        console.log(data.data); // data received by server
    //        console.log(data.headers);
    //
    //      })
    //      .catch(error => {
    //        console.log("erorr!");
    //        console.log(error.status);
    //        console.log(error.error); // error message as string
    //        console.log(error.headers);
    //      });
  }

  //        const reqOpts = {
  //          headers: {
  //            'Access-Control-Allow-Origin': '*',
  //          },
  //          params: new HttpParams(),
  //
  //        };
  //        return new Promise(resolve => {
  //          this.http.get(this.apiUrl + '/listBeverages', reqOpts).subscribe(data => {
  //            resolve(data);
  //          },
  //            err => {
  //              console.log("unbekannter fehler");
  //              //          reject(err);
  //            });
  //        });





  orderBeverage(id, userId) {
    //TODO Userid übergeben
    //    return new Promise(resolve => {
    //      this.http.get(this.apiUrl + '/orderBeverage?productID=' + id + '&userID=' + userId).subscribe(data => {
    //        resolve(data);
    //      },
    //        err => {
    //          console.log(err);
    //        });
    //    });

  }
  getOrderStatus(uuid) {
    //    try {
    //      return new Promise(resolve => {
    //        this.http.get(this.apiUrl + '/getStatus?uuid=aaae8023-3d93-4e99-800b-05e26491a234').subscribe(data => {
    //          resolve(data);
    //        },
    //          err => {
    //            console.log(err);
    //          });
    //      });
    //
    //    } catch (err) {
    //      return null;
    //    }
  }

  getEstimatedTime(uuid) {
    //    try {
    //      return new Promise(resolve => {
    //        this.http.get(this.apiUrl + '/getEstimatedTime?uuid=' + uuid).subscribe(data => {
    //          resolve(data);
    //        },
    //          err => {
    //            console.log(err);
    //          });
    //      });
    //
    //    } catch (err) {
    //      return null;
    //    }
  }
  deleteOrder(uuid) {
    //    try {
    //      return new Promise(resolve => {
    //        this.http.get(this.apiUrl + '/deleteBeverage?uuid=' + uuid).subscribe(data => {
    //          resolve(data);
    //        },
    //          err => {
    //            console.log(err);
    //          });
    //      });
    //
    //    } catch (err) {
    //      return null;
    //    }
  }
}
