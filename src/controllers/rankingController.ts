import { Request, Response } from "express";
import * as rankingService from "../services/rankingService.js"

export async function listRank(req: Request, res: Response){
    const rank = await rankingService.listRank();

    res.status(200).send({fighters: rank})
}