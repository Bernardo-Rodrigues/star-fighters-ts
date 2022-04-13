import joi from "joi";

const battleSchema = joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required()
});

export default battleSchema;