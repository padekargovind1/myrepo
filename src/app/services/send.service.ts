import { Injectable } from '@angular/core';

import swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Injectable()
export class SendService {
  schoolId: string = "";

  constructor(private usersService: UsersService) { }

  makeProfile(school){
    let screenWidth : string = (window.screen.width/3).toString()+'px';
    let screenHeight : string = ((window.screen.height/3)*2).toString()+'px';
    let config= {
      data : {
        school : school
      },
      disableClose: false,
      width: screenWidth,
      height: screenHeight,
      position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
      }
    };
    return config;
  }

  sendMessage(data){
    this.usersService.postToMessages(data)
      .subscribe(response => {
        // wait API
        // console.log(response);
        if (response.code == 200) {
          swal({
            title: "Merci d'avoir choisi CIDE",
            text: 'Votre message a été envoyé à l\'école',
            type: 'success',
            confirmButtonText: "J'AI COMPRIS"
          })
        } else {
          swal({
            title: "Attention",
            text: response.message,
            type: 'warning',
            confirmButtonText: "J'AI COMPRIS"
          })
        }
      });
      return true;
      // this.usersService.postToMessages(data);
      // swal({
      //   title: "Merci d'avoir choisi CIDE",
      //   text: 'Votre message a été envoyé à l\'école',
      //   type: 'success',
      //   confirmButtonText: "J'AI COMPRIS"
      // });
  }

  failSend(){
    swal({
      title: 'Attention',
      text: "Il nous manque des informations afin d'envoyer votre message à l'école",
      type: 'warning',
      confirmButtonText: 'Ok'
    })
  }
  
  storeMessageStatus(messageStatus){
    localStorage.setItem('messageStatus', messageStatus);
  }

  getMessageStatus(){
    return localStorage.getItem('messageStatus');
  }

  cleanMessageStatus(){
    localStorage.removeItem('messageStatus');
  }

}
