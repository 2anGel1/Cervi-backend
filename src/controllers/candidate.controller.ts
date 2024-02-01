import { successResponse, handleError } from '../utils/controller-utils';
import { Request, Response } from 'express';
import { prisma } from "../config";

//
export const getAllCandidates = async (req: Request, res: Response) => {
    try {

        const candidates = await prisma.candidat.findMany();
        return successResponse({ res, data: candidates });

    } catch (error: any) {
        return handleError({ res, error });
    }
}