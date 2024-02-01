import { Response } from 'express';

export interface ResponseData {
    message?: string;
    res: Response;
    code?: number;
    data?: any;
}

export interface ErrorResponseData {
    message?: string;
    res: Response;
    code?: number;
}

export interface HandleErrorData {
    res: Response;
    error: any;
}