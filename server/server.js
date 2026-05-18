require("dotenv").config();
const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");

const catalogueRoutes = require("./routes/catalogueRoutes");

const app = express();

connectDB();

app.use(cors({
    origin: "https://sri-kavins-tailors.netlify.app/"
}));

app.use(express.json());

app.use("/api/catalogue", catalogueRoutes);

app.get("/", (req, res) => {

    res.send("Tailor Server Running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on ${PORT}`);

});
