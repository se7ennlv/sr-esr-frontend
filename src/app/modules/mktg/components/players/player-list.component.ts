import { PlayerModel } from './../../models/player.model';
import { SurveyService } from './../../services/survey.service';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { UtilsService } from './../../../../shared/services/utils.service';
import { ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ToastService } from './../../../../shared/services/toast.service';
import { PlayerService } from './../../services/player.service';
import { FormGroup } from '@angular/forms';
import { IPlayer } from './../../interfaces/player.interface';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['../../data/style.scss']
})
export class PlayerListComponent implements OnInit {
  endpoint: string;

  isThkInclude: boolean = false;
  isSrnInclude: boolean = false;
  isSroInclude: boolean = false;

  items: IPlayer[];
  item: IPlayer;
  loading: boolean = true;
  showFormModal: boolean;
  showImageModal: boolean;
  submitted: boolean;
  editMode: boolean;
  playerForm: FormGroup;
  orgs = [];
  levels = [];
  dropdownItems: MenuItem[];

  images: any[];
  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(newValue) {
    if (this.images && 0 <= newValue && newValue <= (this.images.length - 1)) {
      this._activeIndex = newValue;
    }
  }

  _activeIndex: number = 2;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  genders: any[] = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
  ];

  relationships: any[] = [
    { name: 'NEW PLAYER', value: 'NEW' },
    { name: 'OLD PLAYER', value: 'OLD' },
  ];

  statuses: any[];

  constructor(
    private playerService: PlayerService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private fb: RxFormBuilder,
    private utilsService: UtilsService,
    private breadcrumbService: BreadcrumbService,
    private surveyService: SurveyService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Players Management' }
    ]);
    ReactiveFormConfig.set(this.utilsService.validationMessages);

  }

  ngOnInit(): void {
    this.endpoint = environment.ENDPOINT;

    this.fetchData();
    this.initForm();
    this.fetchOrgs();
    this.fetchLevels();
    this.editMode = false;

    this.statuses = [
      { name: 'ACTIVE', value: true },
      { name: 'INACTIVE', value: false }
    ];

    this.dropdownItems = [{
      label: 'Update', icon: 'pi pi-refresh', command: (e) => {
        this.onUpdate();
      }
    }, {
      label: 'Delete', icon: 'pi pi-times', command: () => {
        this.onDelete();
      }
    }];
  }

  initForm() {
    let model = new PlayerModel();
    this.playerForm = this.fb.formGroup(model);
  }

  fetchData() {
    this.playerService.getPlayers().subscribe((res) => {
      this.items = res.data;
      this.loading = false;
    });
  }

  fetchOrgs() {
    this.playerService.getOrgs().subscribe((res) => {
      this.orgs = res.data;
    });
  }

  fetchLevels() {
    this.playerService.getLevels().subscribe((res) => {
      this.levels = res.data;
    });
  }

  onSelectFile(e) {
    let file = e.files[0];
    this.playerForm.patchValue({ file: file });
  }

  onRowSelect(e) {
    const imgSrc = e.data.fileSrc;
    const imgIndex = e.index;

    if (imgSrc) {
      this._activeIndex = imgIndex;
      this.showImageModal = true;
    }
  }

  onCreate() {
    this.item = {};
    this.submitted = false;
    this.showFormModal = true;
    this.editMode = false;
  }

  onShowDialog() {
    if (!this.editMode) {
      this.playerForm.patchValue({ isActive: 1 });
    }
  }

  onHideDialog() {
    this.playerForm.reset();
    this.submitted = false;
  }

  onSurvey(item: IPlayer) {
    this.item = { ...item };
    this.surveyService.player = item;

    if (item.org.code.toUpperCase() === 'SR') {
      if (item.relationship.toUpperCase() === 'NEW') {
        this.isSrnInclude = true;
        this.surveyService.showSrnDialog.emit(true);
      } else {
        this.isSroInclude = true;
        this.surveyService.showSroDialog.emit(true);
      }
    } else {
      this.isThkInclude = true;
      this.surveyService.showThkDialog.emit(true);
    }
  }

  onDropdownClick(item: IPlayer) {
    this.item = { ...item }
  };

  onUpdate() {
    Object.entries(this.item).forEach(([key, value]: any) => {
      if (this.playerForm.controls.hasOwnProperty(key)) {
        this.playerForm.patchValue({
          [key]: value
        });
      }
    });

    this.showFormModal = true;
    this.editMode = true;
  }

  onDelete() {
    const id = this.item._id;
    this.confirmationService.confirm({
      message: 'Are you sure you want to disable this player?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.playerService.delete(id).subscribe((res) => {
          if (res.status === 'success') {
            this.fetchData();
            this.toastService.showToast(res.status, 'Success', res.message);
          } else {
            this.toastService.showToast(res.status, 'Error', res.message);
          }
        });
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.playerForm.invalid) return false;

    const formData = new FormData();
    Object.entries(this.playerForm.value).forEach(([key, value]: any) => formData.append(key, value));

    if (this.item._id) {
      const id = this.item._id;

      this.playerService.update(id, formData).subscribe((res) => {
        if (res.status === 'success') {
          this.toastService.showToast(res.status, 'Success', res.message);
          this.fetchData();
        } else {
          this.toastService.showToast(res.status, 'Error', res.message);
        }
      }, (error) => {
        this.toastService.showToast('error', 'Error', 'Something went wrong');
      });
    } else {
      this.playerService.create(formData).subscribe((res) => {
        if (res.status === 'success') {
          this.fetchData();
          this.toastService.showToast(res.status, 'Success', res.message);
        } else {
          this.toastService.showToast(res.status, 'Error', res.message);
        }
      }, (error) => {
        this.toastService.showToast('error', 'Error', 'Something went wrong');
      });
    }

    this.showFormModal = false;
    this.item = {};
  }

}
