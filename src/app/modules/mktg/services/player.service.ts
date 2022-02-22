import { IPlayer } from './../interfaces/player.interface';
import { JwtService } from './../../../core/services/jwt.service';
import { ApiService } from './../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  model: IPlayer = Object.assign({});
  isEditMode: boolean = false;

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  create(body: any) {
    const url: string = '/mktg/player';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  update(id: any, body: any) {
    const url: string = '/mktg/player/' + id;
    return this.apiService.put(url, body, this.jwtService.token());
  }

  delete(id: any) {
    const url: string = '/mktg/player/' + id;
    return this.apiService.delete(url, this.jwtService.token());
  }

  getPlayers(): Observable<any> {
    const url: string = '/mktg/players';
    return this.apiService.get(url, this.jwtService.token());
  }

  getOrgs(): Observable<any> {
    const url: string = '/mktg/orgs';
    return this.apiService.get(url, this.jwtService.token());
  }

  getLevels(): Observable<any> {
    const url: string = '/mktg/levels';
    return this.apiService.get(url, this.jwtService.token());
  }

}
