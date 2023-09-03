const router = require("express").Router();
const User = require("../models/auth");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");
const Deposits = require("../models/deposits");

var single = [];
router.post("/signin", async (req, res) => {
    console.log(req.body);
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
})

//Register
router.post("/register", async (req, res) => {
    const newUser = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})


router.get("/all", async (req, res) => {
    const all = await User.find();
    single = [all];
    try {
        console.log(single);
        res.status(200).json(all)
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('deposit/:id', (req, res) => {
    res.status(200).json({ message: `Update Data ${req.params.id}` })
})
router.put('all/:id', (req, res) => {
    res.status(200).json({ message: `Update Data ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Delete Data ${req.params.id}` })
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
router.post("/deposit", verify, async (req, res)=> {
    try {
        const deposit = new Deposits(req.body);
        await deposit.save();
        const all = await User.findById({_id: deposit.deposits})
        all.deposits.push(deposit);
        await all.save();
        res.status(200).json(all);
    } catch (error) {
        res.status(403).json(error)
    }
})

// Login
module.exports = router;