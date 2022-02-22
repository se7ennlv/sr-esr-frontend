import { IProfile } from './../../shared/interfaces/profile.model';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userModel: IProfile;

  constructor(private storage: LocalStorageService) {}

  setUserLogin(userData) {
    this.storage.store('user', userData);
  }

  getUserLogin() {
    this.userModel = this.storage.retrieve('user');
    return this.userModel;
  }

  clearUserLogin() {
    this.storage.clear('user');
  }


}
