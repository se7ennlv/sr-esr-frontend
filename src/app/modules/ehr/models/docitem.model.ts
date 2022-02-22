export interface Main {
    _id?: string;
    title?: string;
}

export interface Sub {
    _id?: string;
    title?: string;
}

export interface IItemDoc {
    _id?: string;
    title?: string;
    subtitle?: string;
    fileSrc?: string;
    main?: Main;
    sub?: Sub;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
}