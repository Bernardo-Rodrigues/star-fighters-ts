import { Request, Response } from "express";
import battleService, { Users } from "../services/battleService.js"

export async function doBattle(req: Request, res: Response){
    const users: Users = req.body;

    const result = await battleService.doBattle(users);

    res.status(201).send(result)
}