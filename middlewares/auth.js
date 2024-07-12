const {setUser,getUser}=require('../services/auth')
async function Restrict(req,res,next){
    const userId=req.cookies?.uid;
    if(!userId){
        return res.render("login")
    }
    const user=getUser(userId)
    if(!user){
        return res.render("login")
    }
    req.user=user;
    next();
}
module.exports=Restrict;