const Express = require('express');
const app = Express();
const Controller = require('../../Controller/Follow/Controller');

app.post('/:_userid',(req,res)=>{
    Controller.following(req,res)
})

app.get('/find',(req,res)=>{
    Controller.find(req,res)
})

module.exports = app;