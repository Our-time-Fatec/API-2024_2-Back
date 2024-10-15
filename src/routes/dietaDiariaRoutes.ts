import { Router } from "express";
import DietaDiariaController from "../controllers/DietaDiariaController";

const routes = Router();

routes.get("/me", DietaDiariaController.listarDietas);
routes.get("/:id", DietaDiariaController.buscarDietaPorId);
routes.get("/me/hoje", DietaDiariaController.listarHoje)

export default routes