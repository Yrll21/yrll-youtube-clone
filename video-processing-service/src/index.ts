// import express
import express from "express";
import {
  convertVideo,
  deleteProcessedVideo,
  deleteRawVideo,
  downloadRawVideo,
  setUpDirectories,
  uploadProcessedVideo,
} from "./storage";

setUpDirectories();

// create express app
const app = express();
app.use(express.json());

// post request
app.post("/process-video", async (req, res) => {
  // get the bucket and filename from the cloud pub/sub message
  let data;
  try {
    const message = Buffer.from(req.body.message.data, "base64").toString(
      "utf-8"
    );
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error("Invalid message payload received.");
    }
  } catch (e) {
    console.error(e);
    return res.status(400).send("Bad Request: missing filename");
  }

  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;

  // Download the raw video from Cloud Storage
  await downloadRawVideo(inputFileName);

  // Convert the video to 360p
  try {
    await convertVideo(inputFileName, outputFileName);
  } catch (e) {
    Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);
    console.log(e);
    return res
      .status(500)
      .send("Internal Server Error: video processing failed");
  }

  // Upload the processed video to Cloud Storage
  await uploadProcessedVideo(outputFileName);

  Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName),
  ]);

  return res.status(200).send("Video processed successfully");
});

// declare port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});
