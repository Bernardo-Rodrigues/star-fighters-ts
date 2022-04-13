import { NextFunction, Request, Response } from "express";
import UnprocessableEntity from "../errors/UnprocessableEntity.js";

export default async function errorHandlingMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
	if (error instanceof UnprocessableEntity) return res.status(error.status).send(error.message);

    if (error.response?.status === 403 || error.response?.status === 404) return res.status(error.response.status).send(error.response.statusText);

	return res.status(500).send(error.message);
}