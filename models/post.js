import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types

// const mediaSchema = new mongoose.Schema({
//     type: {type: String, enum: ['image', 'video'], required: false},
//     url: {type: String, required: true}
// })

const mediaSchema = new mongoose.Schema({
    type: { type: String, enum: ['image', 'video'], required: false },
    url: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
media: [mediaSchema],
description: {type: String},
likeCount: {type: Number, default: 0},
commentCount: {type: Number, default: 0},
thumbnail: { type: String },
},{timestamps: true})

const postModel = mongoose.model("Post", postSchema)

export default postModel