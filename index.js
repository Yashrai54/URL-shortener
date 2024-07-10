const express = require('express');
const app = express();
const URL = require('./models/url')
const path = require('path')
const port = 8000;
const staticRouter = require('./routers/static')
const urlRouter = require('./routers/url')
const Connect = require('./connection');
Connect('mongodb://localhost:27017/short-url').then(console.log('mongo connected'))
app.use(express.json())
app.use(express.urlencoded())
app.use('/url', urlRouter)
app.use('/',staticRouter)
app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timestamps: Date.now() } } })
    res.redirect(entry.redirectURL);
})
app.get('/analytics/:id', async (req, res) => {
    const shortId = req.params.id;
    const result = await URL.findOne({ shortId })
    return res.json({ totalClicks: result.visitHistory.length });
})

app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", { urls: allUrls })
})

app.listen(port, console.log('server started', `${port}`))