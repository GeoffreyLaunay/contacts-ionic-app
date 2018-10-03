import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactsService } from '../../providers/contacts.service';
import { IContact } from '../../models/contact.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public contactsList: IContact[] = []; 

  constructor(
    public navCtrl: NavController,
    private contactsService: ContactsService
  ) {     

  }

  ionViewDidLoad(){
    this.loadContacts();
  }

  loadContacts(){
    this.contactsService.getContacts().then(
      (datas) => {
        console.log(datas);
        this.contactsList = [];
        this.contactsList = datas;
      }
    ); 
  }

}
