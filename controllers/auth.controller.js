const User = require("../models/user.model")
const constants = require("../utils/constants")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../configs/auth.config")

exports.signup = async (req, res) => {
    let userStatus
    //code added by me -> START
    let user = await User.findOne({ userId: req.body.userId })
    if (user) {
        console.log(`'${user}' user already present in DB` )
        return res.status(403).send({
            message: `'${user.userId}' user already present`
        })
    }
    //code added by me -> END
    if( req.body.userType == constants.userTypes.engineer || 
        req.body.userType == constants.userTypes.admin) {
            userStatus = constants.userStatus.pending
    } else {
            userStatus = constants.userStatus.approved
    }
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus
    }

    try {
        const userCreated = await User.create(userObj)
        const postResponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus
        }
        res.status(201).send(postResponse)
    } catch (err) {
        console.log("Something went wrong while saving to DB", err.message)
        res.status(500).send({
            message : "Some internal error while inserting the element"
        })
    }
}

exports.signin = async (req, res) => {
    const user = await User.findOne({ userId : req.body.userId })
    console.log("Signin Request for ", user)

    if(!user) {
        res.status(400).send({
            message: "Failed! UserId doesn't exist!"
        })
        return
    }
    
    if(user.userStatus != constants.userStatus.approved) {
        res.status(403).send({
            message: `Can't allow login as user is in status : [${user.userStatus}]`
        })
        return
    }

    let passwordIsValid = bcrypt.compareSync(
        req.body.password, 
        user.password
    )
    
    if(!passwordIsValid) {
        res.status(401).send({
            message: "Invalid Password!"
        })
        return
    }
    let token = jwt.sign({ userId : user.userId }, config.secretKey, {
        expiresIn : 86400 //24 hours
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
        message: "Signed in successfully!",
        Response: signInResponse
    })
}

