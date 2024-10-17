import { Router } from "express";
import DietaDiariaController from "../controllers/DietaDiariaController";

const routes = Router();

routes.get("/me", DietaDiariaController.listarDietas);
routes.get("/:id", DietaDiariaController.buscarDietaPorId);
routes.get("/me/hoje", DietaDiariaController.listarHoje)
routes.get("/me/forma", DietaDiariaController.listarHojeFormatado)

export default routes