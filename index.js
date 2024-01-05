import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {GetObjectCommand,S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";


// Importing models
import { Award } from "./models/awards.model.js";
import { Project } from "./models/projects.model.js";
import { Skills } from "./models/skills.model.js";
import { Certificates } from "./models/certificates.model.js";
import { Blogposts } from "./models/blogposts.model.js";
import { Education } from "./models/education.model.js";

try {
    // Load environment variables from .env file
    dotenv.config();

    // Create Express app
    const app = express();
    const PORT = process.env.PORT || 5000;

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // MongoDB Connection
    const uri = process.env.ATLAS_URI;
    const s3Client = new S3Client({
        region: "ap-south-1",
        credentials: {
            accessKeyId: process.env.S3_Access_key,
            secretAccessKey: process.env.S3_Secret_access_key
        }
    });

    async function getObjectURL(key){
        const command  = new GetObjectCommand({
            Bucket:"myportfoliodata",
            Key:key,
            Expires:120,
        })
        const url = await getSignedUrl(s3Client,command);
        return url;
    }

    (async () => {
        try {
            // Connect to MongoDB
            await mongoose.connect(uri);
            const connection = mongoose.connection;
            console.log("MongoDB database connection established successfully");

            // Define routes after MongoDB connection is established

            // Award Route
            app.get('/Award', async (req, res) => {
                const allawards = await Award.find();
                res.send(allawards);
            });

            // Education Route
            app.get('/Education', async (req, res) => {
                const alleducations = await Education.find();
                res.send(alleducations);
            });

            // Projects Route
            app.get('/Projects', async (req, res) => {
                const allprojects = await Project.find();
                res.send(allprojects);
            });

            // Skills Route
            app.get('/Skills', async (req, res) => {
                const allskills = await Skills.find();
                res.send(allskills);
            });

            // Certificates Route
            app.get('/Certificates', async (req, res) => {
                const allcertificates = await Certificates.find();
                const promises = allcertificates.map(async (certificate, index) => {
                    try {
                        const url = await getObjectURL(`certificate/${certificate.image}`);
                        certificate.image = url;
                    } catch(e) {
                        console.log(e);
                    }
                });
                await Promise.all(promises);
                res.send(allcertificates);
            });

            // BlogPosts Route
            app.get('/AllBlogPosts', async (req, res) => {
                const allposts = await Blogposts.find();
                // const promises = allposts.map(async (post, index) => {
                //     try {
                //         const url = await getObjectURL(`blogPosts/${post.dataURL}`);
                //         console.log(url);
                //         post.dataURL = url;
                //     } catch(e) {
                //         console.log(e);
                //     }
                // });
                // await Promise.all(promises);
                res.send(allposts);
            });

            // One BlogPosts Route
            app.post('/GetBlogPosts', async (req, res) => {
                try {
                    const { post } = req.body;
                    console.log('Received post:', post);

                    const url = await getObjectURL(`blogPosts/${post}`);
                    console.log('Object URL:', url);

                    res.send(url);
                } catch (error) {
                    console.error('Error processing request:', error);
                    res.status(500).send({ error: 'Internal Server Error' });
                }
            });


            // Start the server
            app.listen(PORT, () => {
                console.log(`Server is running on port: ${PORT}`);
            });

        } catch (err) {
            console.log(err, "error connecting to database");
        }
    })();
} catch (err) {
    console.log(err, "error in index.js");
}
