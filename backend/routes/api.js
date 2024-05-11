const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { validateUserInput } = require("../middleware/validationMiddleware"); // Import the validation middleware

const countries = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "countries.json")));
const states = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "states.json")));
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "cities.json")));


router.get("/countries", (req, res) => {
    try {
        res.json(countries);
    } catch (error) {
        console.error("Error getting countries:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/states", (req, res) => {
    const { country } = req.query;
    console.log("Received country:", country); 


    if (!country || typeof country !== "string") {
        return res.status(400).json({ error: "Country code is required and must be a string" });
    }

    try {
        console.log("All states:", states); 

     
        if (!states.hasOwnProperty(country)) {
            return res.status(404).json({ error: `No states found for country code: ${country}` });
        }


        const statesForCountry = states[country];
        console.log("States for country:", statesForCountry);
        res.json(statesForCountry);
    } catch (error) {
        console.error("Error getting states:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



 
router.get("/cities", (req, res) => {
    const { state } = req.query;
    console.log("Received state:", state); 

    if (!state || typeof state !== "string") {
        return res.status(400).json({ error: "State code is required and must be a string" });
    }

    try {
      
        console.log("All cities:", cities); 
        const citiesForState = cities[state];
        console.log("Cities for state:", citiesForState); 

        if (!citiesForState) {
            return res.status(404).json({ error: `No cities found for state code: ${state}` });
        }

        res.json(citiesForState);
    } catch (error) {
        console.error("Error getting cities:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.post("/saveUser", validateUserInput, (req, res) => { 
    const userData = req.body;
   
    try {
      
        console.log("User data received:", userData);
        res.json({ message: "User data saved successfully" });
    } catch (error) {
        console.error("Error saving user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
