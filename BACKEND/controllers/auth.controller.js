const User = require("../models/user.model")
const constants = require("../utils/constants")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/** SINGN UP CONTROLLER */
exports.signup = async (req, res) => {

    const {name, userId, password, email, userType} = req.body;

    let userStatus
    //code added by me -> START
    let user = await User.findOne({ userId })
    if (user) {
        console.log(`'${user}' user already present in DB` )
        return res.status(403).send({
            message: `'${user.userId}' user already present`
        })
    }
    //code added by me -> END
    if( userType == constants.userTypes.engineer || 
        userType == constants.userTypes.admin) {
            userStatus = constants.userStatus.pending
    } else {
            userStatus = constants.userStatus.approved
    }

    const salt = await bcrypt.genSalt(10)  //Salt generate to Hash Password
    // console.log('Salt Generated:', salt)
    const userObj = {
        name,
        userId,
        email,
        userType,
        password: bcrypt.hashSync(password,salt),
        userStatus
    }

    try {
        const userCreated = await User.create(userObj)
        const postResponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt
        }
        console.log({
            message: "User Created Successfully",
            data: postResponse
        });

        res.status(201).json({
            data: postResponse,
            success: true,
            message: 'User Registered Success',
            statusCode: 201
        })

    } catch (err) {
        console.log("Something went wrong while saving to DB", err.message)
        res.status(500).send({
            success: false,
            message : "Some internal error while inserting the element",
            statusCode: 500
        })
    }
}

/** SIGN IN CONTROLLER */
exports.signin = async (req, res) => {

    const { userId, password } = req.body

    const user = await User.findOne({ userId })
    console.log("Signin Request for ", user)

    if(!user) {
        res.status(400).json({
            success: false,
            message: `Failed! UserId doesn't exist!`,
            statusCode: 400
        })
        return 
    }
    
    if(user.userStatus != constants.userStatus.approved) {
        res.status(403).json({
            message: `Can't allow login as user is in status : [${user.userStatus}]`
        })
        return
    }

    let passwordIsValid = bcrypt.compareSync(password, user.password)
    
    if(!passwordIsValid) {
        console.log("Invalid Password!");
        res.status(401).json({
            success: false,
            message: "Invalid Password!",
            statusCode: 401
        })
        return
    }
    let token = jwt.sign({ userId : user.userId }, process.env.SECRET_KEY, {
        expiresIn : "1d" //24 hours
    })
    
    const signInResponse = {
        name : user.name,
        userId : user.userId,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        accessToken: token
    }
    res.status(201).send({
        data: signInResponse,
        success: true,
        message: "Signed in successfully!",
        statusCode: 201
    })
}

