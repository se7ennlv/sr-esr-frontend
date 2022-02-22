import { ApiService } from './../../../core/services/api.service';
import { JwtService } from './../../../core/services/jwt.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private jwtService: JwtService,
    private apiService: ApiService
  ) { }

  getArticles() {
    const url: string = '/ehr/articles';
    return this.apiService.get(url, this.jwtService.token());
  }

  createArticle(body: any) {
    const url: string = '/ehr/article';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  updateArticle(id: any, body: any) {
    const url: string = `/ehr/article/${id}`;
    return this.apiService.put(url, body, this.jwtService.token());
  }

  deleteArticle(id: number) {
    const url: string = `/ehr/article/${id}`;
    return this.apiService.delete(url, this.jwtService.token());
  }


  getSurveys() {
    const url: string = `/ehr/surveys`;
    return this.apiService.get(url, this.jwtService.token());
  }

  getSurveyReport(year: number) {
    const url: string = `/ehr/surv/rpt/${year}`;
    return this.apiService.get(url, this.jwtService.token());
  }

  createSurvey(body: any) {
    const url: string = '/ehr/survey';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  updateSurvey(id: any, body: any) {
    const url: string = `/ehr/survey/${id}`;
    return this.apiService.put(url, body, this.jwtService.token());
  }

  deleteSurvey(id: number) {
    const url: string = `/ehr/survey/${id}`;
    return this.apiService.delete(url, this.jwtService.token());
  }

  assignSurvey(body: any) {
    const url: string = '/ehr/surv/assign';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  unAssignSurvey(body: any) {
    const url: string = '/ehr/surv/unassign';
    return this.apiService.post(url, body, this.jwtService.token());
  }


  getMainDocs() {
    const url: string = '/ehr/admin/doc/main';
    return this.apiService.get(url, this.jwtService.token());
  }

  createMainDoc(body: any) {
    const url: string = '/ehr/admin/doc/main';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  updateMainDoc(id: any, body: any) {
    const url: string = `/ehr/admin/doc/main/${id}`;
    return this.apiService.put(url, body, this.jwtService.token());
  }

  deleteMainDoc(id: any) {
    const url: string = `/ehr/admin/doc/main/${id}`;
    return this.apiService.delete(url, this.jwtService.token());
  }

  getSubDocs(groupId: any = 'any') {
    const url: string = `/ehr/admin/doc/sub/${groupId}`;
    return this.apiService.get(url, this.jwtService.token());
  }

  createSubDoc(body: any) {
    const url: string = '/ehr/admin/doc/sub';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  updateSubDoc(id: any, body: any) {
    const url: string = `/ehr/admin/doc/sub/${id}`;
    return this.apiService.put(url, body, this.jwtService.token());
  }


  deleteSubDoc(id: any) {
    const url: string = `/ehr/admin/doc/sub/${id}`;
    return this.apiService.delete(url, this.jwtService.token());
  }


  getItemDocs() {
    const url: string = '/ehr/admin/doc/item';
    return this.apiService.get(url, this.jwtService.token());
  }

  createItemDoc(body: any) {
    const url: string = '/ehr/admin/doc/item';
    return this.apiService.post(url, body, this.jwtService.token());
  }

  updateItemDoc(id: any, body: any) {
    const url: string = `/ehr/admin/doc/item/${id}`;
    return this.apiService.put(url, body, this.jwtService.token());
  }

  deleteItemDoc(id: any) {
    const url: string = `/ehr/admin/doc/item/${id}`;
    return this.apiService.delete(url, this.jwtService.token());
  }

}
