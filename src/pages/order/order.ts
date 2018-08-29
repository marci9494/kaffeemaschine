import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {AlertController} from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController) {
    this.coffeId = this.navParams.get('id');
    this.beverageList = this.navParams.get('beverageList');
    this.dateTimeNow = new Date().toISOString();
    this.anzahlKaffe = 1;
    this.userId = localStorage.getItem('userId');
  }

  order(id) {
    this.restProvider.orderBeverage(id, this.userId).then((results: string) => {
      console.log(results["uuid"]);
      localStorage.setItem('lastOrder', results["uuid"]);
      this.showAlert("In Zubereitung", "Die gewünsche bestellung ist aufgegeben");
      this.navCtrl.pop();
      this.navCtrl.parent.select(1);

    }), function() {
      this.showAlert("Fehler", "Ein unbekannter Fehler ist aufgetreten");
    };
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
