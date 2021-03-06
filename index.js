const express = require("express")
const app = express()
const port = 5000
const jwt = require('jsonwebtoken')
const secretKey = require('./config/secretkey').secretKey
const options = require('./config/secretkey').options
// const axios = require('axios')
const MongoClient = require('mongodb').MongoClient

const router1 = require('./router/router1')
const cookieParser = require('cookie-parser')

app.use('/test',router1)
app.use('/static', express.static(__dirname + '/static'))
app.use(cookieParser())

app.get("/", (req, res) => {
    const {token} = req.cookies;
    if(token === undefined) {
        return res.sendFile(__dirname + "/html/login.html")
    }
    res.sendFile(__dirname + "/html/index.html")
})

app.get("/dbTest", (req, res) => {

    const databaseUrl = 'mongodb://192.168.0.70:27017/testdb';
    MongoClient.connect(databaseUrl, function(err, db){

        if(err) throw err;

        console.log(`데이터베이스에 연결되었습니다. ${databaseUrl}`)

        const database = db.db('testdb')
        database.collection('testdb').find({}).toArray((err, result) => {
            
            if(err) throw err 
            console.log('mongo db result')
            console.log(result)
            db.close()
        })
    })
})

app.get("/login",(req,res) => {
    // 이미 쿠키값이 있을때 login을 요청하는 경우는?
    // 로그인이 성공한다면 토큰이 새로 발급된다. 물론 같은 값이다.
    /* 
        다른 아이디로 로그인 해야하는경우?
        로그아웃을 무조건 해야한다.
        그리고 기존 쿠키를 삭제하고 새로운 쿠키로 덮어씌운다. 
    */
    res.sendFile(__dirname + "/html/login.html")
})

// 로그인 외에 회원가입시에도 토큰이 생성되도록 만든다.
app.get("/getLogin", (req,res) => {

    const uid = req.query.uid
    const upw = req.query.upw

    // DB 연결하여 서버에서 해당 uid에 대한 정보를 가져온다
    // uid로 가져온 정보중 비밀번호가 upw와 일치하면 로그인되어서  index.html로 가고 아니면 login.html로 간다.
    // MONGO DB 연결
    const databaseUrl = 'mongodb://192.168.0.79:27017/testdb';
    MongoClient.connect(databaseUrl, function(err, db){

        if(err) throw err;

        console.log(`데이터베이스에 연결되었습니다. ${databaseUrl}`)


    })

    const payload = {
        uid: uid,
        idx: 1
    }

    const jwowebtoken = async function () {
        return await jwt.sign(payload , secretKey, options)
    }
    
    jwowebtoken().then((_token) => {
        // axios.defaults.headers.Authorization = _token;
        res.cookie('token',_token)   //쿠키에 넣을경우
        res.redirect("/")
    })
    //  서버는 유효성을 확인하고 Token을 발급하여 Response로 보냄
})

app.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
})


app.listen(port, () => {
    console.log(`server listen to port ${port}`)
})