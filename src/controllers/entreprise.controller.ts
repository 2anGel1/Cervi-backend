import { successResponse, errorResponse, handleError } from "../utils/controller-utils";
import { Request, Response } from "express";
import { prisma } from "../config";

//
export const getEntreprisesWhithNumber = async (request: Request, response: Response) => {
  try {

    const number = parseInt(request.params.items_number, 10);
    const entreprises = await prisma.entreprise.findMany({ take: number });
    return successResponse({ res: response, data: entreprises })

  } catch (error: any) {

    return handleError({ res: response, error });

  } finally {
    await prisma.$disconnect();
  }
};
//
export const getAllentreprises = async (request: Request, response: Response) => {
  try {

    const entreprises = await prisma.entreprise.findMany({});
    return successResponse({ res: response, data: entreprises })

  } catch (error) {

    return handleError({ res: response, error });

  } finally {
    await prisma.$disconnect();
  }
};
//
export const getEntreprisesQuery = async (
  request: Request,
  response: Response
) => {
  try {
    const { page, perPage } = request.query;
    const pageNumber = Number(page) || 1;
    const startIndex = (pageNumber - 1) * Number(perPage);

    const totalEntreprises = await prisma.entreprise.count();
    if (startIndex >= totalEntreprises) {
      return errorResponse({ res: response, message: "La page demandée n'existe pas." });
    }

    const entreprises = await prisma.entreprise.findMany({
      skip: startIndex,
      take: Number(perPage),
    });

    const totalPage = Math.ceil(totalEntreprises / Number(perPage));
    const nextPage = pageNumber < totalPage ? pageNumber + 1 : null;
    const prevPage = pageNumber > 1 ? pageNumber - 1 : null;
    return successResponse({ res: response, data: { totalPage, prevPage, nextPage, entreprises, totalEntreprises } });

  } catch (error) {
    return handleError({ res: response, error });
  } finally {
    await prisma.$disconnect();
  }
};
//
export const searchEntreprises = async (
  request: Request,
  response: Response
) => {
  const term: string = request.query.term as string;

  if (!term) {
    return errorResponse({ res: response, message: "Search term is missing" });
  }

  try {

    const entreprises = await prisma.entreprise.findMany({
      where: {
        OR: [
          { nomEntreprise: { contains: term } },
          { contactEntreprise: { contains: term } },
        ],
      },
    });
    return successResponse({ res: response, data: entreprises });

  } catch (error) {
    return handleError({ res: response, error });
  } finally {
    prisma.$disconnect;
  }
};
