 let Register = (req, res)=> {
  res.send("registered successfully");
};

 let Login = (req, res) => {
  res.send("signin successfully");
};

module.exports = {
  Register,
  Login
}