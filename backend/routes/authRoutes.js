const router = require("express").Router();
const User = require("../models/auth");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");
const Deposits = require("../models/deposits");
const Withdrawals = require("../models/withdrawals");
const Admin = require("../models/admin");
const transporter = require("../services/nodemailer");

// Login User
router.post("/signin", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    try {
        if (!user) {
            res.status(401).json("User Email Not Found!!");
        } else {
            console.log(user);
            const bytes = await CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const realPassword = await bytes.toString(CryptoJS.enc.Utf8);

            realPassword !== req.body.password && res.status(401).json("Wrong Password or Username!!!");
            const accessToken = await jwt.sign({
                id: user._id, email: user.email
            },
                process.env.SECRET_KEY, { expiresIn: "5d" }
            );
            const { password, ...info } = user._doc;
            res.status(200).json({ ...info, accessToken });
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

// Register User
router.post("/register", async (req, res) => {
    const mailData = {
        from: 'eghoiazibapu@gmail.com',
        to: req.body.email,
        subject: 'Verify Your Email',
        text: 'Click on the Link to Verify Your Email',
        html: '<div style={{display:flex, flex-direction:column, padding:20px}}><h1>Verify your Email<h1/><button style={{padding:5px, background-color:blue, color:white}}>Verify<button/><div/>'
    }
    const newUser = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try {
        const user = await newUser.save();
        // send verify mail function
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/profile", async (req, res) => {
    const profile = await User.findOne(req.body);
    console.log(req.body);
    !profile && res.status(401).json("You are Not a User!!!");
    try { 
        // const bytes = await CryptoJS.AES.decrypt(profile.password, process.env.SECRET_KEY);
        // const realPassword = await bytes.toString(CryptoJS.enc.Utf8);
        // realPassword !== req.body.password && res.status(401).json("Wrong Password or Username!!!");
        // const { password, email, isAdmin, fullName } = user._doc;
        res.status(200).json(profile);
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
})

router.put('deposit/:id', (req, res) => {
    res.status(200).json({ message: `Update Data ${req.params.id}` })
})
router.put('all/:id', (req, res) => {
    res.status(200).json({ message: `Update Data ${req.params.id}` })
})


// Update User Plan
router.put("/plan/:id", verify, async (req, res) => {
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

// Update Personnal settings
router.put("/settings/personnal/:id", verify, async (req, res) => {
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

// Update Security Settings
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

// Update Account Settings
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

// Deposit
router.post("/deposit", verify, async (req, res) => {
    try {
        console.log(req.body)
        const deposit = await new Deposits(req.body);
        await deposit.save();
        res.status(201).json(deposit);
    } catch (error) {
        res.status(403).json(error)
    }
})


// Fetch all Deposits by user_id
router.get("/deposit/single/:id", verify, async (req, res) => {
    try {
        if (req.params.id) {
            // console.log(req.params.id);
            const singleDeposit = await Deposits.find({ user_id: req.params.id });
            res.status(200).json(singleDeposit);
        } else {
            res.status(403).json("Bad Request!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Withdraw Request
router.post("/withdraw", verify, async (req, res) => {
    try {
        console.log(req.body)
        const withdraw = await new Withdrawals(req.body);
        await withdraw.save();
        res.status(201).json(withdraw);
    } catch (error) {
        res.status(403).json(error)
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

// Fetch all Deposits
router.get("/all/deposits", async (req, res) => {
    const allDeposits = await Deposits.find();
    try {
        res.status(200).json(allDeposits);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/settings/walletaddress", async (req, res) => {
    const admin = await Admin.findOne();
    // console.log(admin.walletAddress);
    const walletAddress = admin.walletAddress;
    try {
        res.status(200).json(walletAddress);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;