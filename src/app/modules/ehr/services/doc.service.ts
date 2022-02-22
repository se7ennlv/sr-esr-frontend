import { ApiService } from './../../../core/services/api.service';
import { JwtService } from './../../../core/services/jwt.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  constructor(
    private jwtService: JwtService,
    private apiService: ApiService
  ) {}

  getMainDocs(){
    const url: string = '/ehr/doc/main';
    return this.apiService.get(url, this.jwtService.token());
  }

  getSubDocs(groupId: any) {
    const url: string = `/ehr/doc/sub/${groupId}`;
    return this.apiService.get(url, this.jwtService.token());
  }

}
