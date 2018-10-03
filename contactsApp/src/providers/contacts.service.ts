import { Injectable } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';
import { IContact } from '../models/contact.model';

/*
  Generated class for the ContactService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactsService {

  public contactsAll: IContact[]; 

  constructor(
    private contacts: Contacts
  ) {
    this.contactsAll = [];
  }

  getContacts(){
    return this.contacts.find(['*']).then(
      (datas) => {
        console.log(datas);

        if(datas){          
          for(var i = 0; i < datas.length; i++){
  
            if(datas[i].displayName){

              let mainPHoneNumber = "";
              let mainEmail = "";
              let profileImage = "";

              if( datas[i].phoneNumbers && datas[i].phoneNumbers.length > 0 ){
                mainPHoneNumber = datas[i].phoneNumbers[0].value;
              }

              if( datas[i].emails && datas[i].emails.length > 0 ){
                mainEmail = datas[i].emails[0].value;
              }

              if( datas[i].photos && datas[i].photos.length > 0 ){
                profileImage = datas[i].photos[0].value;
              }

              this.contactsAll.push({
                displayName:     datas[i].displayName,
                mainPHoneNumber: mainPHoneNumber,
                mainEmail:       mainEmail,
                profileImage:    profileImage,
              });
            }
  
          }; // END forEach
        }
        
        return Promise.resolve(this.contactsAll);
      },
      (error: any) => {
        console.error('Error saving contact.', error);

        return Promise.reject(error);
      },
    );       
  }

}
