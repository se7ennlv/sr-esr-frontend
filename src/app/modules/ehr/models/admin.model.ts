export interface IArticle {
    _id?: string;
    topic?: string;
    desc?: string;
    fileSrc?: string;
    publishedAt?: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    isActive?: boolean;
}



