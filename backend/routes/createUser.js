const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
require("dotenv").config();
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const Order = require('../models/Order');

// Fetch food data
router.post("/fetchdata", (req, res) => {
    try {
        res.json({ foodItems: global.foodItem, foodCategories: global.foodCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Fetch user orders
router.post("/myorder", async (req, res) => {
    try {
        let userMail = req.body.email;
        let data = await Order.findOne({ email: userMail });

        if (data) {
            res.json({ success: true, data });
            console.log("Data Fetched and Sent ");
            
        } else {
            res.status(404).json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Place or update an order
router.post("/fetchorder", async (req, res) => {
    let { email, orderData, orderDate } = req.body;

    try {
        let userOrder = await Order.findOne({ email });    

        if (!userOrder) {           
            await Order.create({ email, order: { items: orderData, date: orderDate }});
        } else {

            
            await Order.findOneAndUpdate(
                { email },
                { $push: { order: { items: orderData, date: orderDate } } }
            );
            
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Create a new user
router.post("/createuser",
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password should be at least 5 characters").isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            let salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, salt);

            await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                password: secPass
            });

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
);

// User login
router.post("/login",
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password should be at least 5 characters").isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            let { email, password } = req.body;
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid Email or Password" });
            }

            let isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Invalid Email or Password" });
            }

            let token = jwt.sign({ user: user.id }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });

            res.json({ success: true, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
);

module.exports = router;
