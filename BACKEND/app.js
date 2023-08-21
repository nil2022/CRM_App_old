const mongoose = require("mongoose")
const express = require('express')
const User = require("./models/user.model")
const app = express();
const bcrypt = require('bcryptjs')
const constants = require('./utils/constants')
const path = require('path');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
require('dotenv').config()
const db_url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/crm_db'
const PORT = process.env.PORT || 3002

//Create System User or check if already present
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
        console.log("Error creating user!", err.message)
    }
}

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('strictQuery', true);

const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"))
db.once("open", () => {
    console.log("\nConnected to MongoDB\n")
    init()
  /*  if(process.env.DB_URL1 === "mongodb://127.0.0.1:27017/crm_db") 
    { 
        console.log("CONNECTED TO LOCAL SERVER"); 
    }
        else console.log("Connected to MongoDB Atlas!");
        console.log("\n");  */
    
})

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/ticket.routes')(app)

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
  });
 
app.listen(PORT, () => console.log(`Listening at http://127.0.0.1:${PORT}`))