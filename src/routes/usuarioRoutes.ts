import { Router } from "express";
import controller from "../controllers/UsuarioController";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.post("/", controller.create);
routes.get("/", authMiddleware, controller.list);
routes.get("/me", authMiddleware, controller.getUsuario);
routes.put("/", authMiddleware, controller.update);
routes.put("/agua", authMiddleware, controller.atualzarAgua)
routes.put("/agua/zerar", authMiddleware, controller.zerarAgua)
routes.get("/mydetails", authMiddleware, controller.getUsuarioDetalhes);
routes.delete("/", authMiddleware, controller.delete);
routes.put("/editPassword", controller.editPassword);
routes.get("/verify", controller.verificarEmail)


export default routes