const express = require("express");
const fs = require("fs");
const cors = require("cors"); 
const path = require("path");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
}));


app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")));
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "countries.json")));
const states = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "states.json")));
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "cities.json")));


app.use("/api", apiRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
