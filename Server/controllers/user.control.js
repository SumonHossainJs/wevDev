import User from '../models/user.model.js';
import Video from '../models/video.model.js'
import { createError } from '../error.js'


export const getUser = async (req,res,next) =>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}
export const deleteUser = async (req,res,next) =>{
   if(req.params.id === req.user.id){
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("The requested user has been deleted")
        


    }catch (err){
        next(err);
    }
   }else{
    return next(404, "You can delete only your account");
   }
   
}

export const updateUser = async (req,res,next) =>{
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body
            }, 
            {
                new : true,
            });

            res.status(200).json(updatedUser)
        }catch(err){
            next(err);
        }
    }else{
        return next(createError(404, "You can update only your account"));
    }
}

export const subscribe = async (req,res,next) =>{
    try{
     
            const isub = await User.findByIdAndUpdate(req.user.id, {
              $push: { subscribedUser: req.params.id },
            });
           const gotsub = await User.findByIdAndUpdate(req.params.id, {
              $inc: { subscribers: 1 },
            });
            res.status(200).json({isub, gotsub})
    }catch(err){
        next(err);
    }
}

export const unsubscribe = async (req,res,next) =>{
    try{
        const iunsub = await User.findByIdAndUpdate(req.user.id, {
            $pull : {subscribedUser: req.params.id},
        });
        const gotUnsub = await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers: -1}
        });

        res.status(200).json({iunsub,gotUnsub})
    }catch(err){
        next(err);
    }
}

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
      })
      res.status(200).json("The video has been liked.")
    } catch (err) {
      next(err);
    }
  };
  
  export const dislike = async (req, res, next) => {
      const id = req.user.id;
      const videoId = req.params.videoId;
      try {
        await Video.findByIdAndUpdate(videoId,{
          $addToSet:{dislikes:id},
          $pull:{likes:id}
        })
        res.status(200).json("The video has been disliked.")
    } catch (err) {
      next(err);
    }
  };