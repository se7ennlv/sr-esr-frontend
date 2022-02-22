import { ISRO } from './../interfaces/sro.interface';
import { IPlayer } from './../interfaces/player.interface';
import { ISRN } from '../interfaces/srn.interface';
import { ITHK } from './../interfaces/thk.interface';
import { Observable, Subject } from 'rxjs';
import { JwtService } from './../../../core/services/jwt.service';
import { ApiService } from './../../../core/services/api.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  player: IPlayer;

  showThkDialog = new EventEmitter<boolean>(false);
  showSrnDialog = new EventEmitter<boolean>(false);
  showSroDialog = new EventEmitter<boolean>(false);
  isReload = new EventEmitter<boolean>(false);

  editMode: boolean = false;
  thkModel: ITHK = Object.assign({});
  srnModel: ISRN = Object.assign({});
  sroModel: ISRO = Object.assign({});
 
  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  getAllThkQuestions(): Observable<any> {
    const url: string = '/mktg/thkq';
    return this.apiService.get(url, this.jwtService.token());
  }

  getAllSrnQuestions(): Observable<any> {
    const url: string = '/mktg/srnq';
    return this.apiService.get(url, this.jwtService.token());
  }

  getAllSroQuestions(): Observable<any> {
    const url: string = '/mktg/sroq';
    return this.apiService.get(url, this.jwtService.token());
  }

  getAnswers(org: string): Observable<any> {
    const url: string = `/mktg/ans/${org}`;
    return this.apiService.get(url, this.jwtService.token());
  }

  get(org: string, fDate: any, tDate: any): Observable<any> {
    const url: string = `/mktg/surv/${org}/${fDate}/${tDate}`;
    return this.apiService.get(url, this.jwtService.token());
  }

  create(body: any, org: string): Observable<any> {
    const url: string = `/mktg/surv/${org}`;
    return this.apiService.post(url, body, this.jwtService.token());
  }

  update(id: any, body: any, org: string): Observable<any> {
    const url: string = `/mktg/surv/${org}/${id}`;
    return this.apiService.put(url, body, this.jwtService.token());
  }

  delete(id: number, org: string): Observable<any> {
    const url: string = `/mktg/surv/${org}/${id}`;
    return this.apiService.delete(url, this.jwtService.token());
  }
}
