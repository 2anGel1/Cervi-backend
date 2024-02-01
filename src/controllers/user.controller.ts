import { successResponse, errorResponse, handleError } from "../utils/controller-utils";
import { Request, Response } from 'express';
import { prisma } from "../config";

//
export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const userId = req.body.session.userId;
    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.active) {
      res.status(400).json({ message: "User doesn't exist" });
      return;
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

