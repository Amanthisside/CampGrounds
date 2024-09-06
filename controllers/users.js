const User=require('../models/user');

module.exports.renderRegister=(req,res)=>{
    res.render('users/register');
}

module.exports.register=async(req,res)=>{
    try{
    const{email,username,password}= req.body;
    const user= new User({email,username});
    const registeredUser=await User.register(user,password);
    req.login(registeredUser,err=>{ //on registering the user will be logged in automatically.
        if(err) return next(err);
    })
    console.log(registeredUser);
    req.flash('success','Welcome to YelpCamp');
    res.redirect('/campgrounds');
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin=(req,res)=>{
    res.render('users/login');
}
module.exports.login=(req,res)=>{
    req.flash('success','welcome Back')
   const redirectUrl= res.locals.returnTo||'/campgrounds';
   delete req.session.returnTo;
    res.redirect(redirectUrl);
 }

 module.exports.logout=(req,res)=>{
    req.logout( err=>console.log(err));
    req.flash("success","You are logged out");
    res.redirect('/campgrounds');
}