const router = require("express").Router();
const User = require("../models/auth");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

var single = [];
router.post("/signin",  (req, res) => {
    console.log(req.body);
    const user =  User.findOne( { email: req.body.email, });
    try {
        if(!user) {
         res.status(401).json("User Email Not Found!!");
        } else {            
            const bytes =  CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const realPassword =  bytes.toString(CryptoJS.enc.Utf8);
            
            realPassword !== req.body.password && res.status(401).json("Wrong Password or Username!!!");
            const accessToken = jwt.sign({
                id: user._id, email: user.email
        },
            process.env.SECRET_KEY, { expiresIn: "5d" }
        );
        const { password, ...info } = user._doc;
        res.status(200).json({...info, accessToken});
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


router.get("/all", async (req, res)=> {
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

router.post('/find', async(req, res) => {
    let evy = await User.findOne({ email: req.body.email}).exec();
    console.log(evy);
    console.log(req.body);
    console.log(req.query);
    if(evy){
        res.status(200).json(evy)
    } else{
        res.status(400).json("nir found")
    }
})
// Login
module.exports = router;