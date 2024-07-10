const express=require('express');
const router=express.Router();
const {GenerateShortUrl,handleAnalytics}=require('../controllers/url')

router.post('/',GenerateShortUrl);


module.exports=router;