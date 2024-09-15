import { Router } from "express";
import DietaController from "../controllers/DietaController";

const routes = Router();

routes.post("/", DietaController.criarDieta);
routes.get("/me", DietaController.listarDietas);
routes.put("/:id", DietaController.atualizarDieta);
routes.delete("/:id", DietaController.removerDieta);

export default routes