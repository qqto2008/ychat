import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import { Database } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';
import { ChattemplatePage } from '../chattemplate/chattemplate';
/*
  Generated class for the Group page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  public searchFriend:any;
  public searchFriendList=[];
  public userEmail:string;
  public uid:string;
  public requestName:string;
  public requests=[];
  public friendemail:string;
  public friendlist=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db:Database, public event:Events) {
    this.userEmail=this.navParams.get('email');

  }

  ionViewDidLoad() {

    console.log(this.navParams.get('email'));
    this.db.collection('request').find({name:this.navParams.get('email')}).fetch().subscribe((rqs)=>{
    if(rqs!=null){
      this.requests.push(rqs);
    }
      console.log(rqs);
    });
    this.db.collection('friendlist').find({name:this.navParams.get('email')}).fetch().subscribe((friend)=>{
      if(friend!=null){
        this.friendlist.push(friend);
      }
    });


  }

  searchBox(searchFriendList){

    this.db.collection('user').find({name:this.searchFriend}).fetch().subscribe(
      (searchFriend)=>{
        this.searchFriendList.push(searchFriend);
        this.requestName=searchFriend.name;

        console.log(this.requestName);


      }
    );
  }
  addFriend(friendName){

    this.db.collection('user').find({email:this.navParams.get('email')}).fetch().subscribe((userId)=>{

      console.log(userId.id);
      this.uid=userId.id;
      this.db.collection('request').store({
        name:this.navParams.get('email'),
        request:this.requestName
      });

    });
  }
  acceptRequest(){


    this.db.collection('user').find({name:this.requests[0].request}).fetch().subscribe((searchFriend)=>{
      this.friendemail=searchFriend.email;
      console.log(this.friendemail);
      this.db.collection('friendlist').insert({friend:this.friendemail,name:this.navParams.get('email')});
      this.db.collection('friendlist').insert({friend:this.navParams.get('email'),name:this.friendemail});
    });



  }
  ChatPage(){
    this.navCtrl.push(ChattemplatePage,{title:this.friendlist[0].friend,user:this.userEmail});
    console.log(this.friendlist[0].friend);
  }


}
