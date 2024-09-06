import { Router } from "express";
import user from "./usuarioRoutes"
import auth from "./authRoutes"
import alimento from "./alimentoRoutes"

const routes = Router()

routes.use("/usuario", user);
routes.use("/auth", auth);
routes.use("/alimento", alimento);

export default routes