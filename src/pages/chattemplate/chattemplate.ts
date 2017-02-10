import { Component,ChangeDetectionStrategy, NgZone, OnInit, Input , OnChanges , DoCheck , Injectable, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '@ionic/cloud-angular';
/*
  Generated class for the Chattemplate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chattemplate',
  templateUrl: 'chattemplate.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChattemplatePage {

  public users:any;

  private chatinp:any;
  private chats=[];
  private chat=[];

  public title:string;

  public from:string = this.navParams.get('user');
  public to:string=this.navParams.get('title');
  public channel:string=this.navParams.get('user')+'to'+this.navParams.get('title');
  public channelR:string=this.navParams.get('title')+'to'+this.navParams.get('user');


  constructor(public navCtrl: NavController, public navParams: NavParams,public db:Database, public zone:NgZone, public ref:ChangeDetectorRef, public ar:ApplicationRef) {
    this.zone = new NgZone({enableLongStackTrace:false});
    this.db.connect();
    this.db.collection('user').watch().subscribe( (user) => {
      this.users = user;
    }, (error) => {
      console.error(error);
    });
    this.title=this.navParams.get('title');

    this.db.collection('message').findAll({channel:this.channel}).watch().subscribe((msg)=>{
      this.zone.run(()=>{
        this.chats=msg;
        console.log(this.chats);
        this.ref.markForCheck();
      });






    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChattemplatePage');


  }
  sendMessage(chats){



    this.db.collection('message').insert({
      channel:this.channel,
      from:this.navParams.get('user'),
      to:this.navParams.get('title'),
      timestamp:Date.now(),
      text:this.chatinp
    });
    this.db.collection('message').insert({
      channel:this.channelR,
      from:this.navParams.get('user'),
      to:this.navParams.get('title'),
      timestamp:Date.now(),
      text:this.chatinp
    });
      console.log(this.navParams.get('title'),this.navParams.get('user'),this.channel);
      this.ar.tick();

    }

}
