
import User from '../models/user.model.js';
import Video from '../models/video.model.js';
import Comment from '../models/comment.model.js';
import { createError } from '../error.js';

export const createComment = async (req, res,next) =>{
    try{
        const createNewComment =  new Comment({ ...req.body, userId: req.user.id });

        const savedComment = await createNewComment.save();

        res.status(200).json(savedComment);
    }catch(err){
        next(err);
    }
}

export const updateComment = async (req,res,next) =>{
    try{

        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);

        if(req.user.id === comment.userId || req.user.id === video.userId){
                await Comment.findByIdAndDelete(req.params.id);

                res.status(200).json("The comment has been deleted");
        }else{
            return next(createError(404, "You can delete only your comment"));
        }

    }catch(err){
        next(err);
    }
}


export const deleteComment = async (req,res,next) =>{
    try{
        const video = await Video.findById(req.params.id);
        const comment = await Comment.findById(req.params.id);

        if(req.user.id === video.userId || req.user.id === comment.userId){
            await Comment.findByIdAndUpdate(req.params.id);
            res.status(200).json("Your comment has been deleted");
        }else{
            return next(createError(404, "You can only delete your commnet"));
        }


    }catch(err){
        next(err);
    }
}


export const getComment = async (req,res,next) =>{
    try{

        const comment = await Comment.find({videoId:req.params.videoId});
        res.status(200).json(comment);
        
    }catch(err){
        next(err);
    }
}