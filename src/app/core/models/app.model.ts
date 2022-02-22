export interface App {
    id: number;
    name: string;
    icon: string;
    routerLink: string;
}

export interface IApp {
    userId: string;
    app: App[];
}