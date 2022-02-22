import { formatDate } from "@angular/common";
import { ToastService } from "./../../../../shared/services/toast.service";
import { SurveyService } from "./../../services/survey.service";
import { UtilsService } from "./../../../../shared/services/utils.service";
import {
  ReactiveFormConfig,
  RxFormBuilder,
} from "@rxweb/reactive-form-validators";
import { ISRN } from "../../interfaces/srn.interface";
import { IQuestion } from "../../interfaces/question.interface";
import { FormGroup } from "@angular/forms";
import { IPlayer } from "./../../interfaces/player.interface";
import { Component, OnInit } from "@angular/core";
import { SrnModel } from "../../models/srn.model";

@Component({
  selector: "app-srn-form",
  templateUrl: "./srn-form.component.html",
  styleUrls: ["./style.scss"],
})
export class SrnFormComponent implements OnInit {
  player: IPlayer;
  showDialog: boolean;

  srnForm: FormGroup;
  questions: IQuestion[];
  item: ISRN;
  submitted: boolean;

  q31List = [];
  q41List = [];
  q42List = [];
  numberList = [];
  choices: any[];
  topics = ['q11', 'q31', 'q41', 'q42', 'q43', 'q44', 'q45', 'q56'];

  constructor(
    private fb: RxFormBuilder,
    private utilsService: UtilsService,
    private surveyService: SurveyService,
    private toastService: ToastService
  ) {
    ReactiveFormConfig.set(this.utilsService.validationMessages);
    this.choices = [
      { label: "YES", value: "Y" },
      { label: "NO", value: "N" },
    ];
    this.player = this.surveyService.player;
    this.showDialog = true;
  }

  ngOnInit(): void {
    this.fetchQuestion();
    this.fetchAnswer();
    this.initNumbers();
    this.initForm();

    this.surveyService.showSrnDialog.subscribe((res) => {
      this.showDialog = res;
    });
  }

  initForm() {
    let model = new SrnModel();
    this.srnForm = this.fb.formGroup(model);
  }

  initNumbers() {
    for (let i = 0; i <= 24; i++) {
      this.numberList.push({ label: i + 1, value: i + 1 });
    }
  }

  fetchQuestion() {
    this.surveyService.getAllSrnQuestions().subscribe((res) => {
      this.questions = res.data;
    });
  }

  fetchAnswer() {
    this.surveyService.getAnswers("srn").subscribe((res) => {
      if (res.status === "success") {
        const data = res.data;
        this.q31List = data.filter((item) => item.questionNumber === "q31");
        this.q41List = data.filter((item) => item.questionNumber === "q41");
        this.q42List = data.filter((item) => item.questionNumber === "q42");
      }
    });
  }

  onShowDialog() {
    if (this.surveyService.editMode) {
      this.item = this.surveyService.srnModel;
      this.player = this.item;

      Object.entries(this.item).forEach(([key, value]: any) => {
        if (this.srnForm.controls.hasOwnProperty(key)) {
          const keyList = ["q31", "q41", "q42"];
          if (keyList.includes(key)) {
            value = value.split(",");
          }

          if (key === "surveyAt") {
            value = formatDate(value, "yyyy-MM-dd", "en");
          }

          this.srnForm.patchValue({
            [key]: value,
          });
        }
      });
    } else {
      this.srnForm.patchValue({
        umid: this.player.umid,
        fullName: this.player.fullName,
      });
      this.item = {};
    }
  }

  onHideDialog() {
    this.surveyService.editMode = false;
    this.srnForm.reset();
    this.submitted = false;
    this.item = {};
  }

  dataFormatting() {
    const q31Formatted = this.srnForm.controls["q31"].value.toString();
    const q41Formatted = this.srnForm.controls["q41"].value.toString();
    const q42Formatted = this.srnForm.controls["q42"].value.toString();

    this.srnForm.patchValue({
      q31: q31Formatted,
      q41: q41Formatted,
      q42: q42Formatted,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.srnForm.invalid) {
      return false;
    }

    this.dataFormatting();
    const formData = this.srnForm.value;

    if (this.surveyService.editMode) {
      const id = this.item._id;
      this.surveyService.update(id, formData, "srn").subscribe((res) => {
        if (res.status === "success") {
          this.toastService.showToast(res.status, "Success", res.message);
          this.surveyService.isReload.emit(true);
        } else {
          this.toastService.showToast(res.status, "Error", res.message);
        }
      });
    } else {
      this.surveyService.create(formData, "srn").subscribe((res) => {
        if (res.status === "success") {
          this.surveyService.isReload.emit(true);
          this.toastService.showToast(res.status, "Success", res.message);
        } else {
          this.toastService.showToast(res.status, "Error", res.message);
        }
      });
    }

    this.showDialog = false;
    this.item = {};
  }
}
