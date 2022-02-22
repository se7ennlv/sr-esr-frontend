import { JwtService } from './../../../core/services/jwt.service';
import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  getSrp() {
    const url: string = '/ehr/srp';
    return this.apiService.get(url, this.jwtService.token());
  }

  getMyMart() {
    const url: string = '/ehr/mymart';
    return this.apiService.get(url, this.jwtService.token());
  }

  getLeave() {
    const url: string = '/ehr/leave';
    return this.apiService.get(url, this.jwtService.token());
  }

  getAllRoster() {
    const url: string = '/ehr/roster';
    return this.apiService.get(url, this.jwtService.token());
  }

  getAllMonths() {
    const url: string = '/esr/months';
    return this.apiService.get(url, this.jwtService.token());
  }

  getAllMySurvey(year: number) {
    const url: string = `/ehr/mysurvey/${year}`;
    return this.apiService.get(url, this.jwtService.token());
  }

  
  updateMySurvey(id: string) {
    const url: string = '/ehr/surv/put';
    const body = { docId: id }
    return this.apiService.put(url, body, this.jwtService.token());
  }

  getPayslip(body: any) {
    const url: string = '/ehr/payslip-json';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  createPayslip(body: any) {
    const url: string = '/ehr/payslip';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  sendPayslipToMail(body: any) {
    const url: string = '/ehr/sendmail';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  getAllClinicRecord(year: number) {
    const url: string = `/ehr/mycln/${year}`;
    return this.apiService.get(url, this.jwtService.token());
  }


}
