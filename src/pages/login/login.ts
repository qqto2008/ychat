import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ContactPage } from '../contact/contact';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email:string="";
  password:string="";


  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:Auth, public user:User, public alertCtrler: AlertController, public event:Events) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  pushtoRegister(){
    this.navCtrl.push(RegisterPage);
  }
  checkLogin(){

    let details = {'email':this.email,'password':this.password};
    this.auth.login('basic',details).then(()=>{


      this.navCtrl.push(TabsPage,{email:this.email});

    },(err)=>{
      let alert=this.alertCtrler.create({
        title:'Login Failed',
        subTitle:err.message,
        buttons:['OK']
      });
      alert.present();
    });



  }


}
