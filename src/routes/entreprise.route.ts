import express from "express";

import { getEntreprisesQuery, getEntreprisesWhithNumber, searchEntreprises } from "../controllers/entreprise.controller";
import { getAllentreprises } from "../controllers/entreprise.controller";
  
  const entrepriseRoute = express.Router();

  entrepriseRoute.get('/items_number/:items_number', getEntreprisesWhithNumber);
  entrepriseRoute.get('/', getAllentreprises);
  entrepriseRoute.get('/paginate', getEntreprisesQuery);
  entrepriseRoute.get('/search', searchEntreprises);
  
  export default entrepriseRoute;
  