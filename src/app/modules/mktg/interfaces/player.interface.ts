export interface Org {
    code?: string;
    name?: string;
}

export interface Level {
    name?: string;
}

export interface IPlayer {
    _id?: string;
    umid?: string;
    fileSrc?: string;
    fName?: string;
    lName?: string;
    fullName?: string;
    org?: Org;
    level?: Level;
    rolling?: number;
    winLoss?: number;
    gender?: string;
    tel?: string;
    address?: string;
    relationship?: string;
    createdAt?: Date | String;
    updatedAt?: Date | String;
    isActive?: boolean;
}
