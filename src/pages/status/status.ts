import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {AlertController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-status',
  templateUrl: 'status.html'
})
export class StatusPage {

  currentOrderUuid: any;
  allOrders: any;
  constructor(public navCtrl: NavController, public restProvider: RestProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
//    this.currentOrderUuid = localStorage.getItem('lastOrder');
//    this.restProvider.getOrderStatus(this.currentOrderUuid).then((results: string) => {
//      console.log(results);
//      this.allOrders = [];
//      this.allOrders.push(results);
//
//
//    }), function() {
//      //Errorcode
//    };
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
  
  deleteOrder(orderId){
    let loader = this.presentLoading();
    loader.present();
//    console.log("loeschen" + orderId);
//        this.restProvider.deleteOrder(orderId).then((results: string) => {
//      loader.dismiss();
//    
//
//    }), function() {
//      //Errorcode
//    };
    
  }
  
    presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    return loading;
  }
}
