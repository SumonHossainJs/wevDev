import Video from '../models/video.model.js';
import User from '../models/user.model.js';
import { createError } from '../error.js';


export const addvideo  = async (req,res,next) =>{
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try{
       

        const savedVideo = await newVideo.save();

        res.status(200).json(savedVideo);
    }catch(err){
        next(err);
    }
}

export const updateVdeo = async (req,res,next) =>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, 'Video not found'));

        if(req.user.id === video.userId){
            const updated = await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            }, {new :true});
            res.status(200).json(updated)
        }else{
            return next(createError(404, "You can update only your Video"))
        }

        
    }catch(err){
        next(err)
    }
    
}

export const deleteVideo = async (req,res,next) =>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, "The requested video not found"));

        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The requested video has been deleted");
        }else{
            return next(createError(404, "You can only delete your video"));
        }

    }catch(err){
        next(err);
    }
}

export const getVideo = async (req,res,next) =>{
    try{
        const videos = await Video.findById(req.params.id);
        if(!videos) return next(createError(404," video not found"));

        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}

export const addView = async (req,res,next) =>{
    try{
        const viewAddedVideo = await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views: 1}
        }, {
            new: true,
        });

        res.status(200).json(viewAddedVideo)
    }catch(err){
        next(err);
    }
}


export const Random = async (req, res, next) => {
    try {
      const video = await Video.aggregate(
        [
           { 
             $sample: { size: 40 } 
           }
        ]
     )
      res.status(200).send(video);
    } catch (err) {
      next(err);
    }
  };

  export const sub = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedUser;
  
      const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
          return await Video.find({ userId: channelId });
        })
      );
  
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdA));
    } catch (err) {
      next(err);
    }
  };

  export const trend = async (req, res, next) => {
    try {
      const videos = await Video.find().sort({views: -1});
      res.status(200).send(videos);
    } catch (err) {
      next(err);
    }
  };