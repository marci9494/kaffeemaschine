import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
  
export class HomePage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
   
  }
  order(art){
    console.log(art);
    this.presentLoading();
  }
  
   presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
  


}





