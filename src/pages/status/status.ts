import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {AlertController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {HTTP} from '@ionic-native/http';

@Component({
  selector: 'page-status',
  templateUrl: 'status.html'
})
export class StatusPage {

  currentOrderUuid: any;
  allOrders: any;
  beverageList: any;
  constructor(public navCtrl: NavController, public restProvider: RestProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private nativeHttp: HTTP) {
    let ordersString = localStorage.getItem('orders');
    console.log(ordersString);
    let orders = JSON.parse(ordersString);
    console.log(orders);
    console.log(localStorage.getItem("beverageList"));
    console.log(JSON.parse(localStorage.getItem("beverageList")));
    this.beverageList = JSON.parse(localStorage.getItem("beverageList"));
    this.allOrders = [];
    for (let index = 0; index < orders.length; index++) {
      let apiUrl = 'http://192.168.100.2:5000' + '/getStatus?uuid=' + orders[index];
      this.nativeHttp.get(apiUrl, {}, {}).then((data) => {
        this.allOrders.push(JSON.parse(data.data));
      }).catch((err) => {
        console.log(err);
        this.showAlert("Fehler", "Bitte an den Administrator wenden");
      });
    }

    console.log(this.allOrders);


  }


  showConfirm(orderId) {
    const confirm = this.alertCtrl.create({
      title: 'Bestellung stornieren?',
      message: 'Wollen Sie ihre Bestellung wirklich stornieren?',
      buttons: [
        {
          text: 'Nein',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ja',
          handler: () => {
            this.deleteOrder(orderId);
          }
        }
      ]
    });
    confirm.present();
  }

  deleteOrder(orderId) {
    let loader = this.presentLoading();
    loader.present();
    let apiUrl = 'http://192.168.100.2:5000' + '/deleteBeverage?uuid=' + this.currentOrderUuid;

    this.nativeHttp.get(apiUrl, {}, {}).then((data) => {
      for (let index = 0; index < this.allOrders.length; index++) {
        if (this.allOrders[index]["uuid"] === orderId) {
          this.allOrders.splice(index, 1);
          this.showAlert("Bestellung storniert", "Ihre Bestellung wurde Storniert");
        }
      }


      console.log("Erfolgreich");
      loader.dismiss();
    }).catch((err) => {
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
}
