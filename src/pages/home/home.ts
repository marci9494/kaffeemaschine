import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  status: any;
  beverageList: any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public restProvider: RestProvider,public alertCtrl: AlertController) {

    //wieder einkommentieren
//    this.restProvider.listBeverages().then(data => {
//      this.beverageList = data;
//      console.log(this.beverageList);
//    });

      //Dummy if Emtpy
      this.beverageList = [{"name": "Espresso", "id": 1}, {"name": "Cappuccino", "id": 2}, {"name": "Cafe Creme", "id": 3}, {"name": "Latte Macchiato", "id": 4}, {"name": "Milch-Choc", "id": 5}, {"name": "Milchkaffee", "id": 6}, {"name": "Chociatto", "id": 7}, {"name": "Milchschaum", "id": 7}];

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
    this.restProvider.orderBeverage(id);
    this.showAlert();
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

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'SomeText',
      subTitle: 'Ihr Kaffee wird zubereitet',
      buttons: ['OK']
    });
    alert.present();
  }


}





