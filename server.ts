import express from 'express';
import toml from 'toml';
import fs from 'fs';
import apiRoute from './routes/api';
import apiTestRoute from './routes/apiWithoutRegex';
import bodyParser from 'body-parser';
import joiValidation from './constant/constant';

const app = express();
const config = toml.parse(fs.readFileSync('../config/config.toml', 'utf-8'));
app.use(bodyParser.json());
app.use('/api', joiValidation,apiRoute);
app.use('/apiTest', joiValidation,apiTestRoute);
app.all('/*',(req,res)=>{
    res.send({statusCode:404,message:'Page Not Found'});
})

app.listen(config.port);