import { Request, Response } from "express";
import * as battleService from "../services/battleService.js"

export async function doBattle(req: Request, res: Response){
    const users = req.body;

    const result = await battleService.doBattle(users);

    res.status(201).send(result)
}