const { v4: uuidv4 } = require('uuid');
const credentials = require("../../models/userCredentialsModel");

const frontEndURL = process.env.FRONTEND_URL;
const login = async (req, res) => {
    console.log( "req : " + req)
    const data = req.body || {};
    console.log("data : " +  JSON.stringify(data))

    const user = await credentials.findOne({username: data.username, password: data.password});

    console.log(user);

    if(user){
        res.status(200).json({
            succuss:true,
            code:200,
            data: user,
            message: "User Logged Succussfully."
        })
    } else{
        res.status(401).json({
            succuss:true,
            code:401,
            message: "User not found"
        })
    }
};

const signup = async (req, res) =>{
    res.status(404).json({
        succuss:true,
        code:404,
        message: "Under work"
    })

};
module.exports = { login, signup};