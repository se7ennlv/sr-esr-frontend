import { ApiService } from './../../core/services/api.service';
import { DecimalPipe, formatDate, formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  validationMessages: any;
  field;

  constructor(
    private decimalPipe: DecimalPipe,
    private apiService: ApiService
  ) {
    this.validationMessages = {
      "internationalization": {
        "dateFormat": "dmy",
        "seperator": "/"
      },
      "validationMessage": {
        "alpha": "Only alphabelts are allowed.",
        "alphaNumeric": "Only alphabet and numbers are allowed.",
        "numeric": "Only numbers are allowed.",
        "compare": "inputs are not matched.",
        "contains": "value is not contains in the input",
        "creditcard": "creditcard number is not correct",
        "digit": "Only digit are allowed",
        "email": "email is not valid",
        "greaterThanEqualTo": "please enter greater than or equal to the joining age",
        "greaterThan": "please enter greater than to the joining age",
        "hexColor": "please enter hex code",
        "json": "please enter valid json",
        "lessThanEqualTo": "please enter less than or equal to the current experience",
        "lessThan": "please enter less than or equal to the current experience",
        "lowerCase": "Only lowercase is allowed",
        "minLength": 'Less than minimum length',
        "maxLength": "More than maximum length",
        "maxNumber": "enter value less than equal to 3",
        "minNumber": "enter value greater than equal to 1",
        "password": "please enter valid password",
        "pattern": "please enter valid zipcode",
        "range": "please enter age between 18 to 60",
        "required": "This field is required",
        "time": "Only time format is allowed",
        "upperCase": "Only uppercase is allowed",
        "url": "Only url format is allowed",
        "zipCode": "enter valid zip code",
      }
    }
  }

  getFiscalYear() {
    const url: string = '/esr/year';
    return this.apiService.get(url);
  }

  runningFormat(value, row, index) {
    return 1 + index;
  }

  dateFormat(value) {
    const formatted = value ? formatDate(value, 'yyyy-MM-dd', 'en') : '';
    return formatted;
  }

  dateTimeFormat(value) {
    const formatted = value ? formatDate(value, 'yyyy-MM-dd hh:mm a', 'en') : '';
    return formatted;
  }


  udFormat(value, row, index) {
    return [
      '<a class="btn btn-light rounded-circle edit" href="javascript:void(0)"><i class="fas fa-pencil-alt"></i></a> | ',
      '<a class="btn btn-light rounded-circle del" href="javascript:void(0)"><i class="fas fa-trash"></i></a>',
    ].join('')
  }

  totalFormatter() {
    return 'Total';
  }

  summary(data) {
    const field = this.field;
    const totalSum = data.reduce((sum, row) => {
      return sum + (+row[field]);
    }, 0);

    return '<strong>' + totalSum + '</strong>';
  }

  decimalFormat(value) {
    const formatted = value ? formatNumber(value, "en-US", "1.2-2") : '0.00';
    return formatted;
  }


  photoFormat(value) {
    var imgFormat = "";

    if (value) {
      imgFormat = '<a class="img pointer"><img src="' + value + '" class="rounded-circle mx-auto d-block photo-sm"/></a>';
    } else {
      imgFormat = '<i class="fas fa-user-circle fa-4x text-gray"></i>';
    }

    return imgFormat;
  }

  popover(td, title, placement) {
    // const table = $('#dataTable');

    // table.on('all.post-body.bs.table', (e, name, args) => {
    //   $('[data-toggle="popover"]').popover();

    //   table.find('tbody tr').find(td).each(function () {
    //     const content = $(this).text();
    //     if (content.length > 0) {
    //       $(this).attr('data-original-title', title);
    //       $(this).attr('data-toggle', 'popover');
    //       $(this).attr('data-placement', placement);
    //       $(this).attr('data-trigger', 'hover');
    //       $(this).attr('data-content', content);
    //     }
    //   });
    // });
  }

}
