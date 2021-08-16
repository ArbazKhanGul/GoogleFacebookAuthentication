const router = require('express').Router();
const passport=require("passport")





// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});


// auth logout
router.get('/logout', (req, res) => {
    // handle with passport

    res.send('logging out');
    
});

// auth with google+
router.get('/google', passport.authenticate("facebook"
 ,{
    // scope:['https://www.googleapis.com/auth/userinfo.profile',
    // 'https://www.googleapis.com/auth/userinfo.email']
    // authType: 'reauthenticate',
    scope: ['public_profile', 'email']
 }
 
)
)

router.get('/google/redirect',passport.authenticate("facebook",{
    session:false
}) , async (req,res)=>{
 console.log("I am returning element"+req.user)
const temp=req.user;

const token = await temp.generateAuthToken();
console.log(token)
//  res.redirect("/logout");
    res.send("you reach the call back url")
    
})

module.exports = router;
