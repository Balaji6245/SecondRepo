const express = require("express");
const User = require("../../database/Userschema");
const Follow = require('../../database/FollowSchema')
const Responder = require("../../Helpers/Responder");
const Utills = require("../../Helpers/Utills");

function UserController() {
  this.Createuser = async function (data, res) {
    if (!data || !data.name || !data.email || !data.password)
      return Responder.sendFailureMessage("please Enter Correct Inputs", res);

    var checkuser = await User.findOne({ email: data.email });
    if (checkuser)
      return Responder.sendFailureMessage("This email already exsit", res);

    data["_userid"] = Utills.generateshortid();
    data["password"] = Utills.createhashpassword(data.password);
    var user = await User.create(data)
    if(user) Responder.sendSuccessMessage(user,res)
    if (!user) return Responder.sendFailureMessage("user singup failled", res);

  }

  this.loginuser = async function (data,res) {
    if (!data || !data.email || !data.password)
      return Responder.sendFailureMessage("invalid details", res);

    var checkuser = await User.findOne({
      email: data.email,
      password: Utills.createhashpassword(data.password),
    });
    if(checkuser) Responder.sendSuccessMessage("Login Successfully",res)
    if (!checkuser)
      return Responder.sendFailureMessage("Enter valid details", res);
  };

  this.deleteuser = async function(req,_userid,res){

    var checkuser = await User.findOne({_userid})
    if(!checkuser) Responder.sendFailureMessage("user not found",res)

    User.findOneAndDelete({_userid},(err,user)=>{
      if(user) Responder.sendSuccessMessage("user deleted sucessfully",res)
      else  Responder.sendFailureMessage("user not found",res)
    })
  }

  this.finduser = async function(req,_userid,res){
  
      User.findOne({_userid},(err,user)=>{
        if(user) Responder.sendSuccessMessage(user,res)
        else{
          Responder.sendFailureMessage("user not found",res)
        }
      })
  }

  this.findall = async function(req,res){
    let headers = req.headers['x-consumer-customer']
    let username = headers? headers.split('_')[1]:null;

    var following = []
        var followerid = req.params._userid
        Follow.findOne({followerid: username},(err,user)=>{
            user.forEach((users) => {
                following.push(users._followingid)
            });
        })

    User.find({name:{$ne:username}},(err,user)=>{
      if(user) 
      return Responder.sendSuccessMessage(user,res)
      else{
        Responder.sendFailureMessage("can't find users",res)
      }
    }).select('-_id -__v')
  }

  // this.updateuser = async function(req,)

  this.deleteall = async function(req,res){
    User.deleteMany({},(err,user)=>{
      if(user)
      return Responder.sendSuccessMessage("delete all user",res)
      else Responder.sendFailureMessage('cant delete all user')
    })
  }

}



module.exports = new UserController();
