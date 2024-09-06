import { Router } from "express";
import controller from "../controllers/CategoriaController";

const routes = Router();

routes.get("/", controller.list);

export default routes;
