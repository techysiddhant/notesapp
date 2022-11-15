const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const ejs = require('ejs');
const web = require("./routes/web");
const connectDB = require("./config/connectdb");
const auth = require('./routes/auth');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

// config.env

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;
//Databse connection
connectDB();
require('./config/passport')(passport);
//sesssion
app.use(session({
    secret: "dogs",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })

}));
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//passport initialize
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(process.cwd(), "public")));
//  set view engine
app.set("view engine", "ejs");

// app.get('/',(req,res)=>{
//     res.send("Welcome!!");
// });

//Routes
app.use('/', web);
app.use('/auth', auth);









app.listen(PORT, (req, res) => {
    console.log(`Server is Running on http://localhost:${PORT} ...`);
})