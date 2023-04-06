 const Auth = require('../model/authModel')
 
 const Register = async (req, res)=> {   
    const createData = await Auth.create({
        email: req.body.email,
        password: req.body.password,
    }) 
    console.log(req.body);
    res.status(201).json(createData)
};

 let Login = async (req, res) => {
  const user = await Auth.findOne({ email: req.body.email });
  res.status(200).json(user);
};

module.exports = {
  Register,
  Login
}