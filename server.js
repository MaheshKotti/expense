const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const expenseRouter = require("./routes/expenseRouter");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

// app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/expense", expenseRouter);



mongoose.connect(mongoUrl)
    .then(() => {
        console.log("MongoDB is connected to the server");
    })
    .catch((err) => {
        console.log(`MongoDB connection failed due to ${err}`);
    })



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
});
