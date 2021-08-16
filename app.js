const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup=require("./config/passport-setup")
const app = express();
const mongoose =require("mongoose")
const passport=require("passport")

app.use(express.json())
// set view engine
app.set('view engine', 'ejs');
// app.use(passport.initialize())

// database


let ur='mongodb://arbazkhan:arbaz@cluster0-shard-00-00.zzhzk.mongodb.net:27017,cluster0-shard-00-01.zzhzk.mongodb.net:27017,cluster0-shard-00-02.zzhzk.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-tzihjk-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(ur,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection")
}).catch(()=>{
    console.log("failed connecting")
})

// set up routes

app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
