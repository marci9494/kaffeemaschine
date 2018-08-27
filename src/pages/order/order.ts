import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  beverageList: any;
  coffeId: any;
  dateTimeNow: any;
  anzahlKaffe:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.coffeId = this.navParams.get('id');
    this.beverageList = this.navParams.get('beverageList');
    this.dateTimeNow = new Date().toISOString();
    console.log(this.dateTimeNow);
  }

  order(id){
    console.log("aufgerufen " + id);
    console.log(this.dateTimeNow);
    console.log(this.anzahlKaffe);
  }





}
