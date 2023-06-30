import mongoose from "mongoose";

const videoSchema = new  mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        imgUrl:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required: true,
        },
        desc:{
            type:String,
            required: true,
        },
        videoUrl:{
            type: String,
            required:true, 
        },
        likes: {
            type: [String],
            default: [],
          },
          dislikes: {
            type: [String],
            default: [],
          },
        tags:{
            type:[String],
            default:[]
            
        },
        views:{
            type: Number,
            default: 0,
        }

    }, {
        timestamps: true,
    }
);

export default mongoose.model("video", videoSchema);