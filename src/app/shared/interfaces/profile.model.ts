export interface Role {
    id: number;
    name: string;
}

export interface IProfile {
    fileSrc: string;
    empId: number;
    fname: string;
    lname: string;
    fullName: string;
    gender: string;
    deptName: string;
    jobTitle: string;
    tel: string;
    email: string;
    hiringDate: Date;
    srpScore: number;
    mymartBalance: number;
    role: Role,
    passwordUpdatedAt: Date;
}


