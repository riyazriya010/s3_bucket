import dotenv from 'dotenv'
dotenv.config()
import multer from 'multer'
import path from 'path'
import util from 'util'

import { S3Client } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'

const s3 = new S3Client({
    region: "us-east-1",
    credentials:{
        secretAccessKey: process.env.SECREY_ACCESS_KEY,
        accessKeyId: process.env.ACCESS_KEY
    },
})


const storage = multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
    // contentType: function (req, file, cb) {
    //     cb(null, file.mimetype); // Set the correct content type
    // }
  })


function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|mp4|mov/;
    const extnmae = fileTypes.test(path.extname(file.originalname).toLowerCase())

    const mimeType = fileTypes.test(file.mimetype);
    if(extnmae && mimeType){
        return cb(null, true)
    }else{
        cb('Error: Images only ( jpeg, jpg, png, gif, mp4, mov )!')
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

const uploadMiddleWare = upload

export default uploadMiddleWare




// import dotenv from 'dotenv';
// dotenv.config();
// import multer from 'multer';
// import path from 'path';
// import { S3Client } from '@aws-sdk/client-s3';
// import multerS3 from 'multer-s3';

// const s3 = new S3Client({
//     region: "us-east-1",
//     credentials: {
//         secretAccessKey: process.env.SECRET_ACCESS_KEY,
//         accessKeyId: process.env.ACCESS_KEY,
//     },
// });

// const storage = multerS3({
//     s3: s3,
//     bucket: process.env.BUCKET_NAME,
//     metadata: (req, file, cb) => {
//         cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });

// function checkFileType(file, cb) {
//     const fileTypes = /jpeg|jpg|png|gif|mp4|mov/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = fileTypes.test(file.mimetype);
//     if (extname && mimeType) {
//         cb(null, true);
//     } else {
//         cb(new Error('Error: Only images and videos are allowed!'));
//     }
// }

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     },
// }).array('file', 5);

// // Export the upload middleware directly
// export default upload;
