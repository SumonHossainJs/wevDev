import mongoose from "mongoose";
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';

import jwt from 'jsonwebtoken';

export const signup = async(req,res,next) =>{
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
    
       const savedNewUser =  await newUser.save();
        res.status(200).json(savedNewUser);
      } catch (err) {
        next(err);
      }
}

export const signIn = async (req,res,next) =>{
    try{
        const user = await User.findOne({name:req.body.name});
        if(!user) return next(createError(404,"User not found"));

        const isCurrect = bcrypt.compare(req.body.password, user.password);

        if(!isCurrect) return next(createError(404,"Wrong creadentials"));


        const token = jwt.sign({id:user._id}, process.env.JWT);
        const {password, ...others} = user._doc;

        res.cookie("access_token", token,{
            httpOnly:true,
        }).status(200).json(others);
    }catch(err){
        next(err)
    }
}

export const googleAuth = async (req,res,next) =>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(user) {
            const token = jwt.sign({id:user._id}, process.env.JWT);
            const {password, ...others} = user._doc;

            res.cookie("access_token", token,{
                httpOnly: true,
            }).status(200).json(others);
        }else{
            const newUser = new User({
                ...req.body, fromGoogle:true,
            });

            const savedUser = await newUser.save();

            const token = jwt.sign({id:savedUser._id}, process.env.JWT);

           

            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json(savedUser._doc);

            console.log(res);
        }
    }catch(err){
        next(err)
    }
}