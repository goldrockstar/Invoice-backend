const express = require("express");
const router = express.Router();
const { SparklersData } = require("../model/User"); // Correctly importing SparklersData model

router.post("/add-list", async (req, res) => {
    // This line correctly extracts the `category` and `sparklers_list` array from the request body.
    const { category, sparklers_list } = req.body;
    
    // Validate if the sparklers_list is present and is an array
    if (!sparklers_list || !Array.isArray(sparklers_list)) {
        return res.status(400).json({
            message: "Invalid request body. 'sparklers_list' must be an array."
        });
    }

    try {
        const data = await SparklersData.create({
            category,
            sparklers_list
        });

        res.status(200).json({
            message: "Sparklers list added successfully",
            data: data
        });
    } catch (error) {
        console.error("Error adding sparklers list:", error);
        // Handle specific Mongoose error for duplicate categories
        if (error.code === 11000) {
            return res.status(409).json({
                message: "This category already exists.",
                error: error.message
            });
        }
        res.status(500).json({
            message: "Error adding sparklers list",
            error: error.message
        });
    }
});

router.get("/get-list", async (req, res) => {
    try {
        const data = await SparklersData.find();
        res.status(200).json({
            message: "Sparklers list fetched successfully",
            data: data
        });
    } catch (error) {
        console.error("Error fetching sparklers list:", error);
        res.status(500).json({
            message: "Error fetching sparklers list",
            error: error.message
        });
    }
});

module.exports = router;
