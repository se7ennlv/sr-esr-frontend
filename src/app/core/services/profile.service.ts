import { IProfile } from './../../shared/interfaces/profile.model';
import { AccountService } from './account.service';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userModel: IProfile;

  constructor(
    private jwtService: JwtService,
    private apiService: ApiService,
    private accountService: AccountService
  ) {}

  getProfile() {
    const url: string = '/esr/account';
    return this.apiService.get(url, this.jwtService.token()).subscribe((res) => {
      if (res) {
        this.accountService.setUserLogin(res);
      }
    });
  }

  updateContact(body: any) {
    const url: string = '/esr/put-contact';
    return this.apiService.put(url, body, this.jwtService.token());
  }

  updatePhotoProfile(body: any) {
    const url: string = '/esr/put-photo';
    return this.apiService.put(url, body, this.jwtService.token());
  }

  getApps() {
    const url: string = '/esr/apps';
    return this.apiService.get(url, this.jwtService.token());
  }
}
