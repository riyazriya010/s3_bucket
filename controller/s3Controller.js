import mongoose from "mongoose";
import postModel from "../models/post.js";

// const createPost = async (req, res) => {
//     try {
//         const files = req.files
//         const media = files.map((val, i) => {
//             // return {
//             //     type: val.mimetype == 'video/mp4' ? 'video' : 'image',
//             //     url: val.location
//             // }

//             return {
//                 type: val.mimetype == 'video/mp4' ? 'video' : 'image',
//                 url: val.location
//             };

//         })
//         req.body.media = media
//         console.log('req.body: ', req.body)
//         const result = await postModel.create(req.body)
//         return res.status(200).send({
//             data: result,
//             success: true
//         })
//     } catch (error) {
//         res.status(403).json({
//             status: false,
//             error: error
//         })
//     }
// }

const createPost = async (req, res) => {
    try {
        const files = req.files;
        const mediaFiles = files.file || []; // Main media files
        const thumbnailFile = files.thumbnail ? files.thumbnail[0] : null; // Single thumbnail file

        const media = mediaFiles.map(file => ({
            type: file.mimetype.includes('video') ? 'video' : 'image',
            url: file.location
        }));

        const thumbnailUrl = thumbnailFile ? thumbnailFile.location : null;

        req.body.media = media;
        req.body.thumbnail = thumbnailUrl; // Assign thumbnail URL if available

        const result = await postModel.create(req.body);
        return res.status(200).send({
            data: result,
            success: true
        });
    } catch (error) {
        res.status(403).json({
            status: false,
            error: error.message || error
        });
    }
};

const fileUpload = async (req, res) => {

    console.log('req files: ', req.file)

    if (!req?.file) {
        return res.status(403).json({
            status: false,
            error: 'Please upload a file'
        })
    }

    console.log('req?.file: ', req?.file)

    // if (!req?.file) {
    //     res.status(403).json({ status: false, error: "please upload a file" })
    //     return;
    // }
    // let data = {}
    // if (!!req?.file) {
    //     data = {
    //         url: req.file.location,
    //         type: req.file.mimetype
    //     }
    // }
    let fileData = {}

    if (!!req?.file) {
        fileData = {
            location: req.file.location,
            type: req.file.mimetype
        }
    }
    try {
        res.send({
            data: fileData,
            status: true
        })
    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }
}

export default { fileUpload, createPost }