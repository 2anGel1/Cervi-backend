import { getAllCandidates } from "../controllers/candidate.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { Router } from "express";

const candidatRoute = Router();

candidatRoute.get('/all', requireAuth, getAllCandidates);

export default candidatRoute;