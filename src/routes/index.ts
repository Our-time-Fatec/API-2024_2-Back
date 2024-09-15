import { Router } from "express";
import user from "./usuarioRoutes"
import auth from "./authRoutes"
import alimento from "./alimentoRoutes"
import categoria from "./categoriaRoutes"
import dieta from "./dietaRoutes"
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router()

routes.use("/usuario", user);
routes.use("/auth", auth);
routes.use("/alimento", authMiddleware, alimento);
routes.use("/categoria", authMiddleware, categoria);
routes.use("/dieta", authMiddleware, dieta);

export default routes