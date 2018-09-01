import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {AlertController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
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
//    this.restProvider.orderBeverage(id, this.userId).then((results: string) => {
//      console.log("ergebniss");
//      console.log(results["uuid"]);
//      localStorage.setItem('lastOrder', results["uuid"]);
//      loader.dismiss();
//      console.log(results);
//      this.restProvider.getOrderStatus(results["uuid"]).then((result: string) => {
//        let deliveryDate = new Date(result["deliveryDate"]);
//        console.log(deliveryDate.toLocaleTimeString());
//      this.showAlert("In Zubereitung", "Die gewünsche Bestellung ist am  " + deliveryDate.toLocaleDateString() + " um " + deliveryDate.toLocaleTimeString() + " abholbereit");
//      this.navCtrl.pop();
//      this.navCtrl.parent.select(1);
//      });
//    
      
      
      
      

//    }), function() {
//      loader.dismiss();
//      this.showAlert("Fehler", "Ein unbekannter Fehler ist aufgetreten");
//    };
    
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
