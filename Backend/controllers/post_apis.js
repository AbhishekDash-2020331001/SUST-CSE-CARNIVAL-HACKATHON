const nodemailer = require('nodemailer')
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const TokenModel = require('../models/token')
const OpenAI = require("openai");
// Create an OpenAIApi instance directly
/*const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });*/
const openai = new OpenAI();


function generateRandomToken(length) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(length, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          const token = buffer.toString('hex');
          resolve(token);
        }
      });
    });
}

exports.Login = async (req,res)=>{
    try {
        const {email,password} = req.body
        let pass=""
        await UserModel.findOne({email:email})
        .then(result=>{
            pass = result.password
        })
        .catch(err=>{
            //console.log(pass)
        })
        if(pass==""){
            res.status(401).json("Email is wrong!")
        }
        else{
            bcrypt.compare(password, pass, function(err, result) {
                if(err)console.log(err);
                if(result){
                    const token= jwt.sign({email:email},process.env.JWT_SECRET_KEY,{expiresIn:"30d"})
                    res.status(200).json({token:token})
                }
                else{
                res.status(401).json("Password is wrong!")
                }
            });
        }
    } catch (error) {
        res.status(404).json("Some Error Occured")
    }
}

exports.Register = async (req,res)=>{
    console.log("eshechhhi")
    console.log(req.body);
    const {name,username,email,password}  = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
        $or: [
          { email: email },
          { username: username }
        ]
    };
    UserModel.findOne(query)
    .then(async user=>{
        if(user){
            res.status(401).json("Email or Username already registered")
        }
        else{
            const wordPattern = /^[^\s]+$/;
            if (wordPattern.test(username)) {
                const tokenBite = await generateRandomToken(16)
                const token = tokenBite.toString()
                TokenModel.create({name:name,username:username,email:email,
                    password:hashedPassword,token:token})
                
                const transporter = await nodemailer.createTransport({
                    service:'gmail',
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASS
                    }
                });
                const link = "http://localhost:8000/api/token?token="+token;
                const info = await transporter.sendMail({
                    from: '"QUEEN" <queen@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Confirm Registration on ProCollab", // Subject line
                    text: "Confirm registration by clicking the link",
                    html: `<div>
                        <p>Please confirm your registration `+username+` on <b>QUEEN</b> by just clicking the link given below :</p>
                        <a href=`+link+`>Click here</a>
                    </div>`
                });

                res.status(200).json("Send Email")
            } else {
                res.status(401).json("Username should be a single word")
            }
        }
        
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json("Some problem occurred")
    });
}

exports.ForgetPassword = async(req,res)=>{
    const username = req.body.email
    //console.log(username)
    UserModel.findOne({email:username})
    .then(async user=>{
        
        if(user){
            const email = user.email
            //console.log(email)
            const tokenBite = await generateRandomToken(6)
            const token = tokenBite.toString()
            const transporter = await nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });
            
            const info = await transporter.sendMail({
                from: '"Bashmoti_Dim_190" <bashmoti_dim_190@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Forget Password", // Subject line
                text: "Forget Password",
                html: `<div>
                    <p>Your new password is `+token+`. Use this password to log in. Please change this password after log in for your security.</p>
                </div>`
            });
            const newPassword = await bcrypt.hash(token, 10);
            const filter = { email: username };
            const update = {
              $set: { password: newPassword } 
            };
            
            const result = await UserModel.updateOne(filter, update);
            
            if (result.modifiedCount === 1) {
                console.log('Password updated successfully');
                res.status(200).json("Password updated successfully")
            } else {
                console.log('No document found matching the filter');
            }
            //res.status(401).json("Email or Username already registered")
        }
        else{
            res.status(401).json("Username isn't registered")
        }
        
    })
    .catch(err => res.status(401).json("Some problem occurred"));
}

exports.changePassword = async(req,res)=>{
    const { username, old_password, new_password } = req.body;
    try {
        const user = await UserModel.findOne({ username:username });

        if (!user) {
            res.status(404).json("User not found.");
        }
        bcrypt.compare(old_password, user.password,async function(err, result) {
            if(err)console.log(err);
            //console.log(result)
            if(result){
                const newHash_password = await bcrypt.hash(new_password, 10);
                user.password = newHash_password;
                await user.save();
                res.status(200).json("Password changed successfully.");
            }
            else{
                res.status(401).json("Old password is incorrect.");
            }
        });
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error.");
    }
}








exports.Logout = async(req,res)=>{
    try {
        const token = req.cookies.token
        res.clearCookie('token')
        res.json('Logged out successfully')
    } catch (error) {
        res.json('Error occured')
    }
}

exports.getGPTresponse=async(req,res)=>{
    const {prompt}=req.body;
    console.log(prompt+" hoy nai")
    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
          });
        res.send(response)
    } catch (error) {
        console.log("Here is the error huhuhu")
        console.log(error);
        res.status(500).send(error)
    }
}








