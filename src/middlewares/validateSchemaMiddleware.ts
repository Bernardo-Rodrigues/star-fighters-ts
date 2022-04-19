import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { stripHtml } from "string-strip-html"
import UnprocessableEntity from "../errors/UnprocessableEntity.js"
import battleSchema from "../schemas/battleSchema.js"

function sanitizeString(string: string){
    return stripHtml(string).result.trim()
}

const schemas = {
    "/battle": battleSchema
}

export default async function validateSchemaMiddleware(req: Request, res: Response, next: NextFunction){
    const { body } = req
    const schema: Joi.ObjectSchema = schemas["/"+req.path.split("/")[1]]
    
    Object.keys(body).forEach( key => {
        if(typeof(body[key]) === "string") body[key] = sanitizeString(body[key])
    })

    const validation = schema.validate(body, { abortEarly: false })
    if(validation.error) throw new UnprocessableEntity(validation.error.message);

    next()
}