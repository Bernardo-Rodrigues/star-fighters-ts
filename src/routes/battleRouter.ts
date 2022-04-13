import { Router } from "express";
import * as controller from "../controllers/battleController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const battleRouter = Router();
battleRouter.post("/battle", validateSchemaMiddleware, controller.doBattle);

export default battleRouter;