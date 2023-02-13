const dbConfig = require("./configs/db.config")
const mongoose = require("mongoose")
const express = require('express')
const User = require("./models/user.model")
const app = express();
const bcrypt = require('bcryptjs')
const constants = require('./utils/constants')
const path = require('path');
const serverConfig = require('./configs/server.config')

const PORT = serverConfig.serverPort;
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
    console.log("\n");
    init()
    if(dbConfig.DB_URL === "mongodb://localhost:27017/crm_db") { 
        console.log("CONNECTED TO LOCAL SERVER"); 
    }
        else console.log("Connected to MongoDB Atlas!");
        console.log("\n");
    
})

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/ticket.routes')(app)

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
  });
 
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))