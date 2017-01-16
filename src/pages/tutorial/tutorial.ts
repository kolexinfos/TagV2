import { Component } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';

import { HomePage } from '../home/home';



import { UserProvider } from '../../providers/user-provider/user-provider';

declare var window;

interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  templateUrl: 'tutorial.html',
  
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;


  constructor(public platform: Platform, public navCtrl: NavController, public menu: MenuController, public userProvider: UserProvider) {
    this.slides = [
      {
        title: 'Welcome to <b>Tag</b>',
        description: '<b>The number one car sharing app in the whole of sub-saharan Africa</b>',
        image: 'img/car.jpg',
      },
      {
        title: 'This is how <b>Tag</b> Works',
        description: 'You can either make available your car for users to <span><i>Tag</i></span> along or you join others in your network?',
        image: 'img/car.jpg',
      },
      {
        title: 'Then what happens next?',
        description: 'Tell us you <i>Need Help</i>',
        image: 'img/car.jpg',
      },
      {
        title: 'Need some tips to stay head on schedule??',
        description: 'Gain a <i>heads-up</i> by inviting friends</b>.',
        image: 'img/car.jpg',
      }
    ];

    this.platform.ready().then(() => {
      console.log("ionViewWillEnter called");
    console.log(this.userProvider.GetLocalObject('user'));



    if(this.userProvider.GetLocalObject('user') != null){
      //this.navCtrl.setRoot(HomePage);
    }
    });
  }

  startApp() {

    //this.navCtrl.setRoot(SignupPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(true);

  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  gotoHome() {
    //this.navCtrl.push(SignupPage);
  }

  doFbLogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(HomePage);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }
}
