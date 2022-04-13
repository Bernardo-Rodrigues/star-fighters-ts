import { Router } from "express";
import * as controller from "../controllers/rankingController.js";

const rankingRouter = Router();
rankingRouter.get("/ranking", controller.listRank);

export default rankingRouter;