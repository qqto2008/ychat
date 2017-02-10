import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ContactPage } from '../contact/contact';
import { SettingPage } from '../setting/setting';
/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {



  tab1Root: any = ChatPage;
  tab2Root: any = ContactPage;
  tab3Root: any = SettingPage;

  loginInfo = {email:this.navParams.get('email')};
  constructor(public navCtrl: NavController, public navParams: NavParams, public event:Events) {





  }




  ionViewDidLoad() {
    console.log(this.navParams.get('email'));

  }


}
