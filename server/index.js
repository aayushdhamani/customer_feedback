const express = require('express');
const mongoose = require('mongoose');
const feedbackRoutes = require('./routes/feedbackRoutes');
require('dotenv').config();

const app = express();
const cors=require("cors");


const PORT=process.env.PORT || 4000;


app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));


// API routes
app.use('/api', feedbackRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));


app.get("/",(req,res)=>{
  res.send("Hello world")
})