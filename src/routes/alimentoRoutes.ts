import { Router } from "express";
import AlimentoController from "../controllers/AlimentoController";

const routes = Router();

routes.post("/", AlimentoController.create);
routes.get("/", AlimentoController.listAlimentos);
routes.get("/criadosPorMim", AlimentoController.findAlimentosByUser);
routes.get("/:id", AlimentoController.findAlimentoById);
routes.put("/:id", AlimentoController.update);
routes.delete("/:id", AlimentoController.delete);

export default routes;
