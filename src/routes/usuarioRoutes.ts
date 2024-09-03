import { Router } from "express";
import controller from "../controllers/UsuarioController";

const routes = Router();

routes.get("/", controller.list);
routes.post("/", controller.create);


export default routes