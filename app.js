const dbConfig = require("./configs/db.config")
const mongoose = require("mongoose")
const authController = require("./controllers/auth.controller")
const express = require('express')
const User = require("./models/user.model")
const app = express();
const bcrypt = require('bcryptjs')
const constants = require('./utils/constants')
async function init() {
    let user = await User.findOne({ userId: "nil_2410" })

    if (user) {
        console.log("Admin user already present", user)
        console.log("Welcome System Administrator!")
        return
    }

    try {
        let user = await User.create({
            name: "Nilanjan Haldar",
            userId: "nil_2410",
            email: "nil.haldar@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("26122022", 10),
            userStatus: constants.userStatus.approved
        })
        console.log(user)
        console.log("Welcome System Administrator!")
    } catch (err) {
        console.log(err.message)
    }
}

mongoose.connect(dbConfig.DB_URL);
app.use(express.json())

const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"))
db.once("open", () => {
    console.log("Connected to Mongo DB")
    init()
})

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/ticket.routes')(app)

app.get("/", (req, res) => res.status(200).send("Hitting the GET API"))

app.listen(3000, () => console.log("Listening at http://localhost:3000"))