const express = require('express');
const passport = require('passport');
const router = express.Router();



// @desc Auth with Google
// @route GET/auth/google
router.get('/google', passport.authenticate('google', {scope: ['email','profile']}) );

router.get('/google/callback',
    passport.authenticate('google',{
        successRedirect: '/dashboard',
        failureRedirect: '/'
    })
);

// Logout Route

router.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }
        req.session.destroy((err)=>{
            if(err)
            {
                console.log(err);
            }
            else{
                res.redirect('/');
            }
        })
    })
})

module.exports = router;