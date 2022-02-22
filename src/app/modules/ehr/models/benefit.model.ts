export interface ISRP {
    docNo?: string;
    empId?: string;
    reqScore?: string;
    hodComment?: string;
    requester?: string;
    requestedAt?: string | Date;
    approvedAt?: string | Date;
    expiryIn?: string | Date;
    updatedAt?: string | Date;
}

export interface IMyMart {
    docNo?: string;
    empId?: string;
    totalCredit?: number;
    tranDate?: string | Date;
    updatedAt?: string | Date;
}

export interface ILeave {
    empId?: string;
    leaveCode?: string;
    leaveDesc?: string;
    leaveDay?: string;
    gender?: number;
    updatedAt?: string | Date;
}

export interface IRoster {
    workday?: string | Date;
    empId?: string;
    shiftCode?: string;
    shiftStart?: string;
    shiftEnd?: string;
    firstCheckIn?: string | Date;
    lastCheckOut?: string | Date;
    lateCheckIn?: string;
    earlyCheckOut?: string;
    updatedAt?: string | Date;
}

export interface IMonth {
    monthCode?: string;
    monthName?: string;
    desc?: string;
}


export interface Child {
    medCode?: string;
    medName?: string;
    qtyUsed?: number;
}

export interface IClinic {
    docNo?: string;
    visitedAt?: string;
    empId?: string;
    isSickLeave?: number;
    diseases?: string;
    doctorNote?: string;
    updatedAt?: string;
    child?: Child;
}

