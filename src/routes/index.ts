import { Router } from "express";
import user from "./usuarioRoutes"
import auth from "./authRoutes"

const routes = Router()

routes.use("/usuario", user);
routes.use("/auth", auth);

export default routes