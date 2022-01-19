const Express = require('express');
const app = Express();
const Controller = require('../../Controller/User/Contoller')

app.post('/signup',(req,res)=>{
    Controller.Createuser(req.body,res)
})

app.post('/login',(req,res)=>{
    Controller.loginuser(req.body,res)
})

app.get('/find/:_userid',(req,res)=>{
    Controller.finduser(req,req.params._userid,res)
})

app.get('/find',(req,res)=>{
    Controller.findall(req,res)
})

app.delete('/delete/:_userid',(req,res)=>{
    Controller.deleteuser(req,req.params._userid,res)
})

app.delete('/delete',(req,res)=>{
    Controller.deleteall(req,res)
})
module.exports = app;