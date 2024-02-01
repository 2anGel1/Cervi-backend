import { ResponseData, HandleErrorData, ErrorResponseData } from "../constants/interfaces-constants";
import { Response } from "express";


export const successResponse = (data: ResponseData) => {
    return data.res.status(data.code ?? 200).json({ message: data.message ?? "Ok", data: data.data ?? [] });
}

export const errorResponse = (data: ErrorResponseData) => {
    return data.res.status(data.code ?? 400).json({ message: data.message ?? "Erreur" });
}

export const unauthorizedResponse = (res: Response) => {
    return res.status(401).json({ message: "Unauthorized" });
}

export const handleError = (data: HandleErrorData) => {

    console.error(data.error);
    
    if (data.error.code == "E_VALIDATION_ERROR") {
        console.log("Erreur de validation");
        return data.res.status(data.error.status).json({ message: "Remplissez tous les champs correctement" })
    }
    return data.res.status(500).json({ message: "Erreur interne au serveur" });
}