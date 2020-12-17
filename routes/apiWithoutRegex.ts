import express from 'express';
import Joi from 'joi';
const apiTestRoute = express.Router();

apiTestRoute.post('/v1/parse',(req,res)=>{
    const value = req.body;
    let zeroesStarted = false;
    let parsedResults = [];
    let stringValue = '';
    for(let i=0;i<value.data.length;i++){
        if(parsedResults.length === 2){
            stringValue += value.data[i];
            continue;
        }
        if(zeroesStarted && value.data[i]!=='0'){
            parsedResults.push(stringValue);
            stringValue = '';
            zeroesStarted = false;
        }
        if(!zeroesStarted && value.data[i] === '0'){
            zeroesStarted = true;
        }
        stringValue += value.data[i];
    }
    if(stringValue){
        parsedResults.push(stringValue);
    }
    if(parsedResults && parsedResults.length === 3){
        let [firstName, lastName, clientId] = parsedResults;
        return res.send({statusCode: 200, data:{
            firstName,
            lastName,
            clientId
        }});
    }
    return res.send({statusCode: 400, message: 'Illegal Argument'});
})
apiTestRoute.post('/v2/parse',(req,res)=>{
    const value = req.body;
    let zeroesStarted = false;
    let parsedResults = [];
    let stringValue = '';
    for(let i=0;i<value.data.length;i++){
        if(parsedResults.length === 2){
            stringValue += value.data[i];
            continue;
        }
        if(zeroesStarted && value.data[i] === '0'){
            continue;
        }
        if(zeroesStarted && value.data[i]!=='0'){
            parsedResults.push(stringValue);
            stringValue = '';
            zeroesStarted = false;
        }
        if(!zeroesStarted && value.data[i] === '0'){
            zeroesStarted = true;
            continue;
        }
        stringValue += value.data[i];
    }
    if(stringValue){
        parsedResults.push(stringValue);
    }
    if(parsedResults && parsedResults.length === 3){
        let [firstName, lastName, clientId] = parsedResults;
        return res.send({statusCode: 200, data:{
            firstName,
            lastName,
            clientId: clientId.replace(/([0-9]{3,3})([0-9]{4,4})$/gi,'$1-$2')
        }});
    }
    return res.send({statusCode: 400, message: 'Illegal Argument'});
})
apiTestRoute.all('/*',(req,res)=>{
    res.send({statusCode:404,message:'Page Not Found'});
})
export default apiTestRoute;