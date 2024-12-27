import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import router from './routes/s3Routes.js'
import postModel from './models/post.js'

connectDB()

const app = express()
const PORT = process.env.PORT

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('S3 Bucket Learning Progess')
})

app.get('/video', async (req, res) => {
    try {
        const id = '676f04f4292d72dfcf11583d'; // Use the correct post ID
        const video = await postModel.findById(id);
        if (!video) {
            return res.status(404).send('Video not found');
        }
        res.render('video', { video }); // Render the EJS template with video data
    } catch (error) {
        console.error('Error fetching video:', error); // Log the error for debugging
        res.status(500).send('Server error');
    }
});

app.use('/', router)

app.listen(PORT, (err) => {
    if(err) throw err
    console.log(`Server running on http://localhost:${PORT}`)
})