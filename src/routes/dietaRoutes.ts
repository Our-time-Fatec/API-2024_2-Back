import { Router } from "express";
import DietaController from "../controllers/DietaController";

const routes = Router();

routes.post("/", DietaController.criarDieta);

export default routes