import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Auth,User } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public auth:Auth, public user:User) {

  }
  logout(){
    console.log('logout');
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }


}
