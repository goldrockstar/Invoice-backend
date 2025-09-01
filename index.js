const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require('./router/User');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);

mongoose.connect('mongodb+srv://thangeswaran:thangam1620@cluster0.nehs4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});