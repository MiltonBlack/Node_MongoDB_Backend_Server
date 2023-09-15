const express = require("express");
const router = express.Router();
const Admin = require('../models/admin')
const Deposits = require('../models/deposits')
const User = require('../models/auth')
const verify = require('../verifyToken')
const CryptoJS = require('crypto-js')
const jwt = require("jsonwebtoken");
const Withdrawals = require('../models/withdrawals');

// Signin Admin
router.post("/signin", async (req, res) => {
    const user = await Admin.findOne({ email: req.body.email, isAdmin: true });
    try {
            !user && res.status(401).json("User Email Not Found!!");
            const bytes = await CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const realPassword = await bytes.toString(CryptoJS.enc.Utf8);

            realPassword !== req.body.password && res.status(401).json("Wrong Password or Username!!!");
            const accessToken = await jwt.sign({
                id: user._id, email: user.email
            },
                process.env.SECRET_KEY, { expiresIn: "3d" }
            );
            const data = await user._doc;
            res.status(200).json({ ...data, accessToken });
    } catch (err) {
        res.status(500).send(err);
    }
});


//Register Admin
router.post("/register", async (req, res) => {
    const newUser = await new Admin({
        email: req.body.email,
        fullName: req.body.fullName,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get Admin Profile Data
router.get("/profile", verify, async (req, res) => {
    const profile = await Admin.findOne({ email: req.body.email });
    try {
        if (!profile) {
            res.status(401).json("You are Not an Admin");
        } else {
            const bytes = await CryptoJS.AES.decrypt(profile.password, process.env.SECRET_KEY);
            const realPassword = await bytes.toString(CryptoJS.enc.Utf8);

            realPassword !== req.body.password && res.status(401).json("Wrong Password or Username!!!");
            // const { password, email, isAdmin, fullName } = user._doc;
            res.status(200).json(profile);
        }
    } catch (error) {
        res.status(500).json(err);
    }
})

// Get All Registered Users (Admin).
router.get("/all", async (req, res) => {
    const all = await User.find();
    try {
        res.status(200).json(all)
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a user account
router.delete('/user/:id', verify, async (req, res) => {
    try {
        console.log(req.params.id);
        const removeUser = await User.findByIdAndDelete({ _id: req.params.id });
        console.log(removeUser);
        res.status(200).json(removeUser);
    } catch (error) {
        res.status(500).json(error);
    }
    // res.status(200).json({ message: `Delete Data ${req.params.id}` })
})

// Fetch all Deposits (Admin)
router.get("/all/deposits", async (req, res) => {
    const allDeposits = await Deposits.find();
    try {
        res.status(200).json(allDeposits);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get Single user on Page Load
router.get("/single/:id", verify, async (req, res) => {
    try {
        console.log(req.params);
        if (req.params) {
            const single = await User.findById(req.params.id);
            res.status(200).json(single);
        } else {
            res.status(403).json("Bad Request!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Fetch Withdrawals by user_id
router.get("/withdraw/single/:id", verify, async (req, res) => {
    try {
        const singleWithdraw = await Withdrawals.find({ user_id: req.params.id });
        res.status(201).json(singleWithdraw);
    } catch (error) {
        res.status(403).json(error)
    }
});

// Get All Withdrawals
router.get("/withdraw/all", async (req, res) => {
    const all = await Withdrawals.find();
        if (!all) {
            res.status(403).json("Record not found!!!");
        } else {
            res.json(all);
        }
});

// Update Admin Account Settings
router.put("/settings/account/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body, }
                , { new: true });
            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can Only Update Your Account")
    }
});

// Approve Deposits and Plan Subscriptions
router.put("/approve/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            const approveDnS = await User.findByIdAndUpdate(req.params.id, { $set: req.body, }
                , { new: true });
            res.status(200).json(approveDnS);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Only Admins can Approve Deposits and Plan Subscriptions")
    }
});

// Update Admin Security Settings
router.put("/settings/security/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        var data;
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();

            data = {
                password: req.body.password
            };
        }
        console.log(data);
        try {
            const updatePassword = await User.findByIdAndUpdate(req.params.id, { $set: { password: req.body.password }, }
                , { new: true });
            res.status(200).json(updatePassword.password);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can Only Update Your Account")
    }
});

module.exports = router;