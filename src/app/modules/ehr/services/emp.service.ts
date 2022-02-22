import { JwtService } from './../../../core/services/jwt.service';
import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  getAllEmployees() {
    const url: string = '/esr/emps';
    return this.apiService.get(url, this.jwtService.token());
  }
}
