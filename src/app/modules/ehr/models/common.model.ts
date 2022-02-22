export interface IYear {
    yearCode?: number;
    desc?: number
}

export interface ISurvey {
    _id?: string;
    topic?: string;
    url?: string;
    status?: number;
}

export interface Child {
    _id?: string;
    topic?: string;
    url?: string;
}

export interface ISurveyRecord {
    _id?: string;
    empId?: number;
    empName?: string;
    dept?: string;
    onYear?: number;
    status?: number;
    createdAt?: Date;
    updatedAt?: any;
    child?: Child;
}








