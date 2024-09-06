import { Router } from "express";
import AlimentoController from "../controllers/AlimentoController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.post("/", authMiddleware, AlimentoController.create);
routes.get("/", authMiddleware, AlimentoController.listAlimentos);
routes.get("/criadosPorMim", authMiddleware, AlimentoController.findAlimentosByUser);
routes.get("/:id", authMiddleware, AlimentoController.findAlimentoById);
routes.put("/:id", authMiddleware, AlimentoController.update);
routes.delete("/:id", authMiddleware, AlimentoController.delete);

export default routes;
