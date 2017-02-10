import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError, Database } from '@ionic/cloud-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerEmail:string='';
  registerPassword:string='';
  registerName:string='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:Auth, public user:User, public db:Database) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerCheck(){
    console.log(this.registerEmail);


    let details: UserDetails ={'email':this.registerEmail,'password':this.registerPassword,'name':this.registerName};
    this.auth.signup(details).then(()=>{
      this.db.connect();
      const userCon=this.db.collection('user');
      userCon.store(
        {
          email:this.registerEmail,
          name:this.registerName,
          friend:[{friendName:''}]
        }
      );
      this.navCtrl.setRoot(LoginPage);

    },(err:IDetailedError<string[]>)=>{
      for(let e of err.details){
        if(e==='conflict_email'){
          alert('Email already exists.');
        }else{

        }
      }
    });
  }

}
