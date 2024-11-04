interface IPaginationMeta {
    totalData?: number;
    totalPage?: number;
    page: number;
    prevLink: string | null;
    nextLink: string | null;
}

interface IErrorResponse {
    message: string; 
    details?: string; 
}

export interface IBasicResponse{
    code:number;
    msg: string; 
    data?: any[];
    error?: IErrorResponse;
    meta?: IPaginationMeta;
}