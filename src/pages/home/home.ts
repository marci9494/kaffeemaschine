import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {AlertController} from 'ionic-angular';
import {OrderPage} from '../order/order'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  status: any;
  beverageList: any;
  userId: any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public restProvider: RestProvider, public alertCtrl: AlertController) {
    //    wieder einkommentieren
    //        this.restProvider.listBeverages().then(data => {
    //          this.beverageList = data;
    //          console.log(this.beverageList);
    //        });

    //Dummy if Emtpy
    this.beverageList = [{"name": "Espresso", "id": 1}, {"name": "Cappuccino", "id": 2}, {"name": "Milchschaum", "id": 3}, {"name": "Latte Macchiato", "id": 4}, {"name": "Milch-Choc", "id": 5}, {"name": "Milchkaffee", "id": 6}, {"name": "Chociatto", "id": 7}, {"name": "Milchschaum", "id": 8}];




    this.userId = localStorage.getItem('userId');
    if (this.userId == null || this.userId == "") {
      //      console.log("userid=null");
      this.userId = this.uuidv4();
      localStorage.setItem('userId', this.userId);
      //      
    }

    console.log(this.userId);

  }
  order(id) {
    let loading = this.presentLoading();
    loading.present();
    console.log(id);
    this.orderBeverage(id);
    loading.dismiss();
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    return loading;
  }

  getStatus() {
    this.restProvider.getStatus()
      .then(data => {
        this.status = data;
        console.log(this.status);
      });
  }
  orderBeverage(id) {
    //Fehler behebung

    this.navCtrl.push(OrderPage, {

      id: id,
      beverageList: this.beverageList
    });

    //    this.restProvider.orderBeverage(id, this.userId).then((results: string) => {
    //      console.log(results);
    //      localStorage.setItem('lastOrder', results);
    //      this.showAlert("In Zubereitung","Die gewünsche bestellung ist aufgegeben");
    //      
    //    }), function() {
    //       this.showAlert("Fehler","Ein unbekannter Fehler ist aufgetreten");
    //    };


  }

  listBeverage() {
    let loading = this.presentLoading();
    this.restProvider.listBeverages()
      .then(data => {
        this.beverageList = data;
        console.log(this.beverageList);

      });

    loading.dismiss();
  }

  showAlert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


}





