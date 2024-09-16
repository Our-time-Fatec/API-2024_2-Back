import { Router } from "express";
import AlimentoConsumido from "../controllers/AlimentoConsumidoController";

const routes = Router();

routes.post("/", AlimentoConsumido.create);
routes.get("/:id", AlimentoConsumido.listAlimentosConsumidos);
routes.put("/:id", AlimentoConsumido.update);
routes.delete("/:id", AlimentoConsumido.delete);

export default routes;
