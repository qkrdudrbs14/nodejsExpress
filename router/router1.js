const express = require('express')
const router = express.Router()
const path = require('path')
const {verifyToken} = require('../middlewares/auth')
const cookieParser = require('cookie-parser')

router.use(cookieParser())

router.get("/test1", verifyToken, (req, res) => {
    const html = path.join(__dirname,'..',"/html/test1.html")
    res.sendFile(html)
})

router.get("/test2", verifyToken, (req, res) => {
    const html = path.join(__dirname,'..',"/html/test2.html")
    res.sendFile(html)
})

module.exports = router