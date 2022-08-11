const express = require("express");
const app = express();
const cors= require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const connectdb = require("./db");
const userRoute= require('./routes/users')
const authRoute= require('./routes/auth')
const postRoute= require('./routes/posts')

dotenv.config();

//connecting to database
connectdb();

//middleware
app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(morgan("common"));

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
