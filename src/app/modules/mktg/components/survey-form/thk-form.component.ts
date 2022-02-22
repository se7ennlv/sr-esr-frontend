import { formatDate } from "@angular/common";
import { ThkModel } from "./../../models/thk.model";
import { IPlayer } from "./../../interfaces/player.interface";
import { ToastService } from "../../../../shared/services/toast.service";
import { ITHK } from "../../interfaces/thk.interface";
import { IQuestion } from "../../interfaces/question.interface";
import { FormGroup } from "@angular/forms";
import { SurveyService } from "../../services/survey.service";
import { UtilsService } from "../../../../shared/services/utils.service";
import {
  ReactiveFormConfig,
  RxFormBuilder,
} from "@rxweb/reactive-form-validators";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-thk-form",
  templateUrl: "./thk-form.component.html",
  styleUrls: ["./style.scss"],
})
export class ThkFormComponent implements OnInit {
  showDialog: boolean;
  player: IPlayer;

  thkForm: FormGroup;
  questions: IQuestion[];
  item: ITHK;
  submitted: boolean;

  q41List = [];
  q43List = [];
  numberList = [];
  choices: any[];
  topics = ["q41", "q42", "q43", "q44", "q45"];

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

    this.surveyService.showThkDialog.subscribe((res) => {
      this.showDialog = res;
    });
  }

  initForm() {
    let model = new ThkModel();
    this.thkForm = this.fb.formGroup(model);
  }

  initNumbers() {
    for (let i = 0; i <= 24; i++) {
      this.numberList.push({ label: i + 1, value: i + 1 });
    }
  }

  fetchQuestion() {
    this.surveyService.getAllThkQuestions().subscribe((res) => {
      this.questions = res.data;
    });
  }

  fetchAnswer() {
    this.surveyService.getAnswers("thk").subscribe((res) => {
      if (res.status === "success") {
        const data = res.data;
        this.q41List = data.filter((item) => item.questionNumber === "q41");
        this.q43List = data.filter((item) => item.questionNumber === "q43");
      }
    });
  }

  onShowDialog() {
    if (this.surveyService.editMode) {
      this.item = this.surveyService.thkModel;
      this.player = this.item;

      Object.entries(this.item).forEach(([key, value]: any) => {
        if (this.thkForm.controls.hasOwnProperty(key)) {
          const keyList = ["q41", "q43"];

          if (keyList.includes(key)) {
            value = value.split(",");
          }

          if (key === "surveyAt") {
            value = formatDate(value, "yyyy-MM-dd", "en");
          }

          this.thkForm.patchValue({
            [key]: value,
          });
        }
      });
    } else {
      this.thkForm.patchValue({
        umid: this.player.umid,
        fullName: this.player.fullName,
      });
      this.item = {};
    }
  }

  onHideDialog() {
    this.surveyService.editMode = false;
    this.thkForm.reset();
    this.submitted = false;
    this.item = {};
  }

  dataFormatting() {
    const q41Formatted = this.thkForm.controls["q41"].value.toString();
    const q43Formatted = this.thkForm.controls["q43"].value.toString();

    this.thkForm.patchValue({
      q41: q41Formatted,
      q43: q43Formatted,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.thkForm.invalid) {
      return false;
    }

    this.dataFormatting();
    const formData = this.thkForm.value;

    if (this.surveyService.editMode) {
      const id = this.item._id;
      
      this.surveyService.update(id, formData, "thk").subscribe((res) => {
        if (res.status === "success") {
          this.toastService.showToast(res.status, "Success", res.message);
          this.surveyService.isReload.emit(true);
        } else {
          this.toastService.showToast(res.status, "Error", res.message);
        }
      });
    } else {
      this.surveyService.create(formData, "thk").subscribe((res) => {
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
