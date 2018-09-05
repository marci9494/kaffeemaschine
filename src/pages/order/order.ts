import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {AlertController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {HTTP} from '@ionic-native/http';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  beverageList: any;
  coffeId: any;
  dateTimeNow: any;
  anzahlKaffe: any;
  userId: any;
  apiUrl: 'http://192.168.100.2:5000';
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private nativeHttp: HTTP) {
    this.coffeId = this.navParams.get('id');
    this.beverageList = this.navParams.get('beverageList');
    this.dateTimeNow = this.toIsoString(new Date());
    console.log(this.dateTimeNow);
    this.anzahlKaffe = 1;
    this.userId = localStorage.getItem('userId');
  }

  order(id) {
    let loader = this.presentLoading();
    loader.present();
    let apiOrderBeverage = 'http://192.168.100.2:5000' + '/orderBeverage?productID=' + id + '&userID=' + this.userId + "&date=" + this.dateTimeNow
    this.nativeHttp.get(apiOrderBeverage, {}, {}).then((data) => {
      let result = JSON.parse(data.data);
      let oldOrdersString = localStorage.getItem('orders');
      if (oldOrdersString) {
        let orders = JSON.parse(oldOrdersString);
        orders.push(result["uuid"]);
        let ordersString = JSON.stringify(orders);
        localStorage.setItem("orders", ordersString);
      } else {
        let orders = [];
        orders.push(result["uuid"]);
        let ordersString = JSON.stringify(orders);
        localStorage.setItem("orders", ordersString);
      }
      let apigetStatus = 'http://192.168.100.2:5000' + '/getStatus?uuid=' + result["uuid"]
      this.nativeHttp.get(apigetStatus, {}, {}).then((data) => {
        let parsedResult = JSON.parse(data.data);
        if(parsedResult["deliveryDate"]){
          let deliveryDate = new Date(parsedResult["deliveryDate"]);
          this.showAlert("In Zubereitung", "Die gewünsche Bestellung ist am  " + deliveryDate.toLocaleDateString() + " um " + deliveryDate.toLocaleTimeString() + " abholbereit");
        }else{
          this.showAlert("In Zubereitung" , "Die gewünschte Bestellung ist in bearbeitung. Leider kann keine Uhrzeit ermittelt werden");  
        }
        this.navCtrl.pop();
        this.navCtrl.parent.select(1);
        loader.dismiss();


      }).catch(err => {
        console.log(err);
        this.showAlert("Fehler", "Bitte an den Administrator wenden");
        loader.dismiss();
      });


    }).catch(err => {
      console.log(err);
      this.showAlert("Fehler", "Bitte an den Administrator wenden");
      loader.dismiss();
    });

  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    return loading;
  }
  showAlert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  toIsoString = function(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}






}
