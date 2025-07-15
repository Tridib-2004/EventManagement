require("dotenv").config();
const express=require("express");
const db = require("./config/db");  // Import the database connection
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const cors=require("cors");
app.use(cors());
const port=5000 || process.env.PORT;
const userRoute=require("./routes/userRoute.js");
const eventRoute=require("./routes/eventRoute.js");

app.use('/events', eventRoute);
app.use('/users', userRoute);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});