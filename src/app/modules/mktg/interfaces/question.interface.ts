export interface Item {
    code?: string;
    leading?: string;
    title?: string;
}

export interface Sub {
    code?: string;
    leading?: string;
    title?: string;
    item?: Item[];
}

export interface IQuestion {
    code?: string;
    leading?: string;
    title?: string;
    sub?: Sub[];
}

