import { Router } from "express";
import controller from "../controllers/UsuarioController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.post("/", controller.create);
routes.get("/", authMiddleware, controller.list);
routes.get("/me", authMiddleware, controller.getUsuario);
routes.put("/", authMiddleware, controller.update);
routes.delete("/", authMiddleware, controller.delete);


export default routes