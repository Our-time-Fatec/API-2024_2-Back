import { Router } from "express";
import user from "./usuarioRoutes"
import auth from "./authRoutes"
import alimento from "./alimentoRoutes"
import categoria from "./categoriaRoutes"
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router()

routes.use("/usuario", user);
routes.use("/auth", auth);
routes.use("/alimento", authMiddleware, alimento);
routes.use("/categoria", authMiddleware, categoria);

export default routes