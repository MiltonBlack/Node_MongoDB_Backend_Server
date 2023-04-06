 const Auth = require('../model/authModel')
 const bcrypt = require('bcrypt');

 const saltRounds = 10;
 
 const Register = async (req, res)=> {  
  const hashedPsw = await bcrypt.hash(req.body.password, saltRounds);
    const createData = await Auth.create({
        email: req.body.email,
        password: hashedPsw,
    }) 
    console.log(req.body);
    res.status(201).json(createData)
};

 let Login = async (req, res) => {
  const user = await Auth.findOne({ email: req.body.email });
  const compare = await bcrypt.compare(req.body.password, user.password)
  if (compare) {
    res.status(200).json(user);
  }
};

module.exports = {
  Register,
  Login
}