import express from "express"
import "dotenv/config"
import cors from 'cors';
import bodyParser from 'body-parser'
import post from './API/post.js';
import get from './API/get.js';
import DELETE from './API/delete.js';
import put from './API/put.js';

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser.json());


  app.get('/', (req, res) => {
    res.send("🚀 Working fine!")
  })

  app.use(get)
  app.use(post)
  app.use(DELETE)
  app.use(put)

  app.listen(PORT, () => {
    console.log(`🚀 App is Running on ${PORT}`);
  });


  
export default app;