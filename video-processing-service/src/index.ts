import express from "express";
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcessedVideo } from "./storage";

setupDirectories()

const app = express();
app.use(express.json());

app.post("/process-video", async (req,res) => {
    let data;
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
        data = JSON.parse(message);
        if (!data.name) {
            throw new Error('Invalid message payload received.')
        }
    } catch (error){
        console.error(error);
        return res.status(400).send('Bad Request: missing filename')
    }

    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;

    // Download the raw video from Cloud Storage
    await downloadRawVideo(inputFileName)

    // Convert the video to 360p
    try {
        convertVideo
    } catch (error){
        Promise.all([
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFileName)
        ])
        console.log(error)
        return res.status(500).send('Internal Server error: Video processing failed.')
    }
    
    // Upload the processed video to Cloud Storage
    await uploadProcessedVideo(outputFileName)

    Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ])

    return res.status(200).send("Processing finished successfully.")
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(
        `Listening at port: ${port}`
    )
})