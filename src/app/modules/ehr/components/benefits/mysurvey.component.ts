import { UtilsService } from './../../../../shared/services/utils.service';
import { ISurveyRecord, IYear } from './../../models/common.model';
import { ToastService } from './../../../../shared/services/toast.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { BenefitService } from './../../services/benefit.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mysurvey',
  templateUrl: './mysurvey.component.html',
  styleUrls: ['./style.scss']
})
export class MysurveyComponent implements OnInit {
  fiscalYears: IYear[];
  items: ISurveyRecord[];
  isShowModal: boolean = false;
  docId: string;
  topic: string;
  docUrl: SafeResourceUrl;
  loadCounter: number = 0;

  constructor(
    private benefitService: BenefitService,
    private breadcrumbService: BreadcrumbService,
    public domSanitizer: DomSanitizer,
    private toastService: ToastService,
    private utilsService: UtilsService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Survey / Questionnaire' }
    ]);
  }

  ngOnInit(): void {
    this.fetchFiscalYear();
  }

  onShowModal(item: ISurveyRecord) {
    this.isShowModal = true;
    this.docId = item._id;
    this.topic = item.child.topic;
    this.docUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(item.child.url);
  }

  onLoad() {
    this.loadCounter++;

    if (this.loadCounter > 1) {
      this.benefitService.updateMySurvey(this.docId).subscribe((res) => {
        if (res.status === 'success') {
          this.toastService.showToast('success', 'Sccess', 'Your survey has been submitted.');
        }

        this.isShowModal = false;

      }, (error) => {
        this.toastService.showToast('error', 'Error', 'Something went wrong');
      });
    }
  }

  onHide() {
    this.loadCounter = 0;
    const selectedYear = this.fiscalYears[0].yearCode;

    this.fetchData(selectedYear);
  }

  onChangeYear(e) {
    this.fetchData(e.value);
  }

  fetchData(year: number) {
    this.benefitService.getAllMySurvey(year).subscribe((res) => {
      if (res.status === 'success') {
        this.items = res.data;
      }
    });
  }

  fetchFiscalYear() {
    this.utilsService.getFiscalYear().subscribe((res) => {
      if (res.status === 'success') {
        this.fiscalYears = res.data;
      }

      const topYear = this.fiscalYears[0].yearCode;
      this.fetchData(topYear);
    });
  }

}




