import Joi from 'joi';

let joiValidation = (req,res,next) => {
    const schema = Joi.object().keys({
        data: Joi.string().required()
    });
    const { error, value } = schema.validate(req.body);
    if(error){
        return res.send({statusCode: 400, message: 'Illegal Argument'});
    }
    next();
}
export default joiValidation;