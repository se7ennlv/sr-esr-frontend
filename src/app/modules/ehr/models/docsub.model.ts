export interface Main {
    _id?: string;
    title?: string;
}

export interface ISubDoc {
    _id?: string;
    leading?: string;
    title?: string;
    subtitle?: string;
    trailing?: string;
    main?: Main;
    isDefault?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
}