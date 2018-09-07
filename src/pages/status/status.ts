import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {AlertController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {HTTP} from '@ionic-native/http';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'page-status',
  templateUrl: 'status.html'
})
export class StatusPage {

  currentOrderUuid: any;
  allOrders: any;
  beverageList: any;
  finishedOrders: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private nativeHttp: HTTP) {

  }

  saveInLocalStorage(key, value) {

    localStorage.removeItem(key);
    localStorage.setItem(key, value);

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
    let apiUrl = 'http://192.168.100.2:5000' + '/deleteBeverage?uuid=' + orderId;

    this.nativeHttp.get(apiUrl, {}, {}).then((data) => {
      for (let index = 0; index < this.allOrders.length; index++) {
        if (this.allOrders[index]["uuid"] === orderId) {
          this.allOrders.splice(index, 1);
          this.showAlert("Bestellung storniert", "Ihre Bestellung wurde Storniert");
          var orders = JSON.parse(localStorage.getItem('orders'));
          for (let i = 0; i < orders.length; i++) {
            if (orders[i] === orderId) {
              orders.splice(i, 1);
              this.saveInLocalStorage("orders", JSON.stringify(orders));
            }
          }
        }
      }


      loader.dismiss();
    }).catch((err) => {
      console.log(err);
      this.showAlert("Fehler", "Bitte an den Administrator wenden");
      loader.dismiss();
    });

  }
  ngOnInit() {
    this.finishedOrders = JSON.parse(localStorage.getItem("finishedOrders"));
    if (!this.finishedOrders) {
      this.finishedOrders = [];
    }
  }
  ionViewWillEnter() {

    let ordersString = localStorage.getItem('orders');
    let updatedOrders = [];

    let orders = JSON.parse(ordersString);
    this.beverageList = JSON.parse(localStorage.getItem("beverageList"));
    this.allOrders = [];
    this.finishedOrders = JSON.parse(localStorage.getItem("finishedOrders"));
    if (!this.finishedOrders) {
      this.finishedOrders = [];
    }



    if (orders) {
      let loader = this.presentLoading();
      loader.present();
      for (let index = 0; index < orders.length; index++) {
        let apiUrl = 'http://192.168.100.2:5000' + '/getDBInformation?uuid=' + orders[index];
        this.nativeHttp.get(apiUrl, {}, {}).then((data) => {
          let orderToAdd = JSON.parse(data.data);
          if (orderToAdd) {
            var y = +orderToAdd["coffee"];
            orderToAdd["coffee"] = y;
            for (let orderIndex = 0; orderIndex < this.beverageList.length; orderIndex++) {
              if (orderToAdd["coffee"] == this.beverageList[orderIndex]["id"]) {
                orderToAdd["productName"] = this.beverageList[orderIndex]["name"];
              }
            }

            if (orderToAdd["tocoffeemachine"] === 1) {
              this.finishedOrders.push(orderToAdd)

            } else {
              this.allOrders.push(orderToAdd);
              updatedOrders.push(orderToAdd["uuid"]);
            }
          } else {
            //order bekommt kein Status mehr. Loeschen
            //TODO FROM DB information holen
          }

          this.saveInLocalStorage("orders", JSON.stringify(updatedOrders));
          this.saveInLocalStorage("finishedOrders", JSON.stringify(this.finishedOrders));
          loader.dismiss();
        }).catch((err) => {
          console.log(err);
          this.showAlert("Fehler", "Bitte an den Administrator wenden");
        });
      }
      if(orders.length == 0){
        loader.dismiss();
      }
    }


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
