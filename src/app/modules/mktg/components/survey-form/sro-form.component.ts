import { formatDate } from "@angular/common";
import { ToastService } from "./../../../../shared/services/toast.service";
import { SurveyService } from "./../../services/survey.service";
import { UtilsService } from "./../../../../shared/services/utils.service";
import {
  ReactiveFormConfig,
  RxFormBuilder,
} from "@rxweb/reactive-form-validators";
import { SroModel } from "./../../models/sro.model";
import { ISRO } from "../../interfaces/sro.interface";
import { IQuestion } from "../../interfaces/question.interface";
import { FormGroup } from "@angular/forms";
import { IPlayer } from "./../../interfaces/player.interface";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sro-form",
  templateUrl: "./sro-form.component.html",
  styleUrls: ["./style.scss"],
})
export class SroFormComponent implements OnInit {
  player: IPlayer;
  showDialog: boolean;

  sroForm: FormGroup;
  questions: IQuestion[];
  item: ISRO;
  submitted: boolean;

  q13List = [];
  q29List = [];
  q31List = [];
  q32List = [];
  q33List = [];
  q41List = [];
  q43List = [];
  numberList = [];
  choices: any[];

  topics = ['q13', 'q29', 'q41', 'q42', 'q43', 'q44', 'q45'];
  isYesNo = ['q141', 'q142', 'q56'];
  isRating = ['q34', 'q51', 'q52', 'q53', 'q54', 'q55'];

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

    this.surveyService.showSroDialog.subscribe((res) => {
      this.showDialog = res;
    });
  }

  initForm() {
    let model = new SroModel();
    this.sroForm = this.fb.formGroup(model);
  }

  initNumbers() {
    for (let i = 0; i <= 24; i++) {
      this.numberList.push({ label: i + 1, value: i + 1 });
    }
  }

  fetchQuestion() {
    this.surveyService.getAllSroQuestions().subscribe((res) => {
      this.questions = res.data;
    });
  }

  fetchAnswer() {
    this.surveyService.getAnswers("sro").subscribe((res) => {
      if (res.status === "success") {
        const data = res.data;
        this.q13List = data.filter((item) => item.questionNumber === "q13");
        this.q29List = data.filter((item) => item.questionNumber === "q29");
        this.q31List = data.filter((item) => item.questionNumber === "q31");
        this.q32List = data.filter((item) => item.questionNumber === "q32");
        this.q33List = data.filter((item) => item.questionNumber === "q33");
        this.q41List = data.filter((item) => item.questionNumber === "q41");
        this.q43List = data.filter((item) => item.questionNumber === "q43");
      }
    });
  }

  onShowDialog() {
    if (this.surveyService.editMode) {
      this.item = this.surveyService.sroModel;
      this.player = this.item;

      Object.entries(this.item).forEach(([key, value]: any) => {
        if (this.sroForm.controls.hasOwnProperty(key)) {
          const keyList = ["q13", "q29", "q31", "q32", "q33", "q41", "q43"];
          if (keyList.includes(key)) {
            value = value.split(",");
          }

          if (key === "surveyAt") {
            value = formatDate(value, "yyyy-MM-dd", "en");
          }

          this.sroForm.patchValue({
            [key]: value,
          });
        }
      });
    } else {
      this.sroForm.patchValue({
        umid: this.player.umid,
        fullName: this.player.fullName,
      });
      this.item = {};
    }
  }

  onHideDialog() {
    this.surveyService.editMode = false;
    this.sroForm.reset();
    this.submitted = false;
    this.item = {};
  }

  dataFormatting() {
    const q13Formatted = this.sroForm.controls["q13"].value.toString();
    const q29Formatted = this.sroForm.controls["q29"].value.toString();
    const q31Formatted = this.sroForm.controls["q31"].value.toString();
    const q32Formatted = this.sroForm.controls["q32"].value.toString();
    const q33Formatted = this.sroForm.controls["q33"].value.toString();
    const q41Formatted = this.sroForm.controls["q41"].value.toString();
    const q43Formatted = this.sroForm.controls["q43"].value.toString();

    this.sroForm.patchValue({
      q13: q13Formatted,
      q29: q29Formatted,
      q31: q31Formatted,
      q32: q32Formatted,
      q33: q33Formatted,
      q41: q41Formatted,
      q43: q43Formatted,
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.sroForm.invalid) {
      return false;
    }

    this.dataFormatting();
    const formData = this.sroForm.value;

    if (this.surveyService.editMode) {
      const id = this.item._id;
      this.surveyService.update(id, formData, "sro").subscribe((res) => {
        if (res.status === "success") {
          this.toastService.showToast(res.status, "Success", res.message);
          this.surveyService.isReload.emit(true);
        } else {
          this.toastService.showToast(res.status, "Error", res.message);
        }
      });
    } else {
      this.surveyService.create(formData, "sro").subscribe((res) => {
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
