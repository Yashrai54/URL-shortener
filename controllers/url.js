const shortid=require('shortid');
const URL=require('../models/url')

async function GenerateShortUrl(req,res){
     const shortID=shortid();
    const body=req.body;

    if(!body.url){
        return res.status(400).json({status:'Bad Request'});
    }
     await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
     })
     return res.render("home",{id:shortID})
}


module.exports={GenerateShortUrl};