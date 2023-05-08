
let userModel=require("../model/userModel")
let jwt=require("jsonwebtoken")

const createAuthor = async function (req, res) { 
    try {
      const data = req.body;
      console.log(".......7");
      if (Object.keys(data).length == 0)
        return res.status(400).send({ status: false, msg: 'enter body' });
      let nameRegex = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
      let mailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  
      if (!data.fname)
        return res
          .status(400)
          .send({ status: false, msg: 'first name required' });
  
      if (!data.lname)
        return res.status(400).send({ status: false, msg: 'last name required' });
  
      if (
        !nameRegex.test(data.fname) ||
        !nameRegex.test(data.lname)
      ) {
        return res.status(400).send({ msg: 'Please enter valid characters only in fname and lname' });
      }
  
      if (!data.title)
        return res.status(400).send({ status: false, msg: 'title required' });
      if (
        data.title != 'Mr' &&
        data.title != 'Mrs' &&
        data.title != 'Miss'
      )
        return res.status(400).send({ status: false, msg: 'enter valid title' });
  
      if (!mailRegex.test(data.email)) {
        return res.status(400).send({ msg: 'Please enter valid mailId' });
      }
      if (!data.email)
        return res.status(400).send({ status: false, msg: 'email required' });
        
      const email = await userModel.findOne({ email: data.email });
      if (email) return res.status(400).send({ status: false, msg: 'email already taken' });
    
  
      if (!data.password)
        return res.status(400).send({ status: false, msg: 'password required' });
  
      if (!passRegex.test(data.password))
        return res.status(400).send({
          msg: 'Please enter a password which contains min 8 letters, at least a symbol, upper and lower case letters and a number',
        });
   console.log(".............58");
      const savedData = await userModel.create(data);
  
      res.status(201).send({ status: true, msg: savedData });
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
  };
  //...............................................................................................................
  //login

  const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    if (!userName)
      return res
        .status(400)
        .send({ status: false, msg: 'please enter emailId' });

    let password = req.body.password;
    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: 'please enter password' });

    let findUser = await userModel.findOne({
      email: userName,
      password: password,
    });
    if (!findUser)
      return res.status(404).send({
        status: false,
        msg: 'Email or Password is not valid',
      });

    let token = jwt.sign(
      {
        userId: findUser._id.toString(),
      },
      'group-21'
    );
    res.setHeader('x-api-key', token);
    res.status(200).send({ status: true, token: token });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.loginUser=loginUser
  module.exports.createAuthor=createAuthor