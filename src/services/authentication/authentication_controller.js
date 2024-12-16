const { v4: uuidv4 } = require('uuid');
const credentials = require("../../models/userCredentialsModel");

const frontEndURL = process.env.FRONTEND_URL;
const login = async (req, res) => {
    console.log( "req : " + req)
    const data = req.body || {};
    console.log("data : " +  JSON.stringify(data))

    const user = await credentials.findOne({emailid: data.email, password: data.password});

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

    try{
        // Valiadation
            //if fail return 400.

        // Validate user exists
        const existingUser = await credentials.findOne({emailid: req.body.email});

        if(existingUser){
            return res.status(409).json({
                succuss:true,
                code:409,
                message: "User already exists"
            });
        }

        //create new model value from the request body
        const model = new credentials({
            username: req.body.username,
            password: req.body.password,
            emailid: req.body.email
        })



        const user = await credentials.insertMany(model);
        console.log(user);

        if(user){
            res.status(201).json({
                succuss:true,
                code:201,
                data: user,
                message: "User created Succussfully."
            })
        } 
    }  catch(error){

            res.status(500).json({
                succuss:true,
                code:500,
                message: error
            })

    }
};
module.exports = { login, signup};