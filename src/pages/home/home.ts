import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {AlertController} from 'ionic-angular';
import {OrderPage} from '../order/order'
import {HTTP} from '@ionic-native/http';
import {Platform} from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  status: any;
  beverageList: any;
  userId: any;
  apiUrl: any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public restProvider: RestProvider, public alertCtrl: AlertController, private nativeHttp: HTTP, private platform: Platform) {

    this.platform.ready().then(() => {
      let loading = this.presentLoading();
      loading.present();
      let apiUrl = 'http://192.168.100.2:5000' + '/listBeverages';
      this.nativeHttp.get(apiUrl, {}, {}).then((data) => {
        this.beverageList = JSON.parse(data.data);
        localStorage.setItem("beverageList", JSON.stringify(this.beverageList));
        loading.dismiss();
      }).catch((err) => {
        console.log(err);
        this.showAlert("Fehler", "Bitte an den Administrator wenden");
      });
    });

    //Dummy if Emtpy
//        this.beverageList = [{"name": "Espresso", "id": 1}, {"name": "Cappuccino", "id": 2}, {"name": "Milchschaum", "id": 3}, {"name": "Latte Macchiato", "id": 4}, {"name": "Milch-Choc", "id": 5}, {"name": "Milchkaffee", "id": 6}, {"name": "Chociatto", "id": 7}, {"name": "Milchschaum", "id": 8}];



    this.userId = localStorage.getItem('userId');
    if (this.userId == null || this.userId == "") {
      this.userId = this.uuidv4();
      localStorage.setItem('userId', this.userId);
      //      
    }
  }
  order(id) {
    let loading = this.presentLoading();
    loading.present();
    this.orderBeverage(id);
    loading.dismiss();
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    return loading;
  }


  orderBeverage(id) {
    //Fehler behebung

    this.navCtrl.push(OrderPage, {

      id: id,
      beverageList: this.beverageList
    });



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





