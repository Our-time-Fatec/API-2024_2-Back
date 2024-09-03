import { Router } from "express";
import user from "./usuarioRoutes"

const routes = Router()

routes.use("/usuario", user);

export default routes