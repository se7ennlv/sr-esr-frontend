import { IProfile } from './../../shared/interfaces/profile.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: IProfile;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private jwtService: JwtService,
    private apiServiece: ApiService
  ) { }

  login(formData: any) {
    const url: string = '/esr/login';
    const body = {
      'username': formData.username,
      'password': formData.password
    };

    return this.apiServiece.post(url, body);
  }

  logout() {
    this.jwtService.clearToken();
    this.accountService.clearUserLogin();
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    const token = this.jwtService.getToken();

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  checkpoint(password: any): Observable<any> {
    const url: string = '/esr/checkpoint';
    const body = {
      'password': password
    };

    return this.apiServiece.post(url, body, this.jwtService.token());
  }


  changePwd(body: any) {
    const url: string = '/esr/put-password';
    return this.apiServiece.put(url, body, this.jwtService.token());
  }


}
