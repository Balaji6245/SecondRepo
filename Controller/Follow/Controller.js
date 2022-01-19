const express = require("express");
const Follow = require("../../database/FollowSchema");
const Responder = require("../../Helpers/Responder");
const User = require('../../database/Userschema')

function follow(){

    this.following = async function(req,res){

        let headers = req.headers['x-consumer-username'];
        let username = headers? headers.split('_')[1]: null;
 
        User.findOne({_userid : username}, async(err, user)=>{
            if(err || !user){
                Responder.sendFailureMessage("invalid user",res)
            }
            var followingid = req.params._userid

            if(followingid)
            var data = {_followingid: followingid,_followerid:username}
            Follow.create(data)
            if(data)
            return Responder.sendSuccessMessage(data,res)
            else{
                return Responder.sendFailureMessage("user not found",res)
            }
            
        })
    }

    this.find = async function(req,res){

        
    }
}

module.exports = new follow();