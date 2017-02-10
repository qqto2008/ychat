import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { Auth,Database } from '@ionic/cloud-angular';
import { ContactPage } from '../pages/contact/contact';
import { SettingPage } from '../pages/setting/setting';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  public users:Array<string>;

  constructor(platform: Platform, public auth:Auth,public db:Database) {
    this.db.connect();
    this.db.collection('users').watch().subscribe((users)=>{
      this.users=users;
    },(error)=>{
      console.error(error);
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      if(this.auth.isAuthenticated()){
        this.rootPage=TabsPage;
      }else{
        this.rootPage=LoginPage;
      }
    });

  }
  endMessage(message:string){
    this.db.collection('users').store({text:message,time:Date.now()});
  }
}
