import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';

@Component({
  selector: 'page-status',
  templateUrl: 'status.html'
})
export class StatusPage {

  currentOrderUuid: any;
  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.currentOrderUuid = localStorage.getItem('lastOrder');
    this.restProvider.getOrderStatus(this.currentOrderUuid).then((results: string) => {
      console.log(results);

    }), function() {
    };
  }

}
