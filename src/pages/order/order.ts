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
  apiUrl: 'http://192.168.179.105:5000';
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private nativeHttp: HTTP) {
    this.coffeId = this.navParams.get('id');
    this.beverageList = this.navParams.get('beverageList');
    this.dateTimeNow = new Date().toISOString();
    this.anzahlKaffe = 1;
    this.userId = localStorage.getItem('userId');
  }

  order(id) {
    let loader = this.presentLoading();
    loader.present();
    console.log("order ausgeführt");
    let apiOrderBeverage = 'http://192.168.178.105:5000' + '/orderBeverage?productID=' + id + '&userID=' + this.userId

    this.nativeHttp.get(apiOrderBeverage, {}, {}).then((data) => {
      console.log(data.data);
      let result = JSON.parse(data.data);
      localStorage.setItem('lastOrder', result["uuid"]);
      let apigetStatus = 'http://192.168.178.105:5000' + '/getStatus?uuid=' + result["uuid"]
      this.nativeHttp.get(apigetStatus, {}, {}).then((data) => {
        console.log(data.data);
        let result = JSON.parse(data.data);
        localStorage.setItem('lastOrder', result["uuid"]);
        let deliveryDate = new Date(result["deliveryDate"]);
        this.showAlert("In Zubereitung", "Die gewünsche Bestellung ist am  " + deliveryDate.toLocaleDateString() + " um " + deliveryDate.toLocaleTimeString() + " abholbereit");
        this.navCtrl.pop();
        this.navCtrl.parent.select(1);
        loader.dismiss();


      }).catch(err => {
        console.log(err);
        this.showAlert("Fehler", "Bitte an den Administrator wenden");
      });


    }).catch(err => {
      console.log(err);
      this.showAlert("Fehler", "Bitte an den Administrator wenden");
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







}
