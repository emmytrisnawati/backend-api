const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var secretkey = 'wwwww'

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req,res) => {
    let obj = {
        'username':'Emmy',
        'pass':'123456' 
    }
    res.status(404).end('Tidak ditemukan')
})

app.get('/myprofile/:userid', (req,res) => {
    let userid = req.params.userid
    res.send('My Profile ' +userid)
})

app.post('/login', (req, res) =>{
    let body = req.body
    if (body.username == 'Emmy' && body.password == '12345') {
        let token = jwt.sign({'Hello': 'World'}, secretkey)
        res.send(token)
    } else {
        res.status(403).end('Username/Password Salah!')
    }
})

app.get('/myprofile', (req, res) =>{
    var token = req.headers['authorization']
    jwt.verify(token, secretkey, function(err, decoded) {
        if (decoded == undefined) {
            res.status(403).end('Username/Password Salah!')
        } else {
            res.status(200).end('Oke')
        }
    })
})

app.post('/user', (req, res) => {
    let body = req.body //baca payload
    res.json(body)
})

app.put('/user', (req, res) => {
    let body = req.body //baca payload
    res.json(body)
})
app.delete('/user', (req, res) => {
    let body = req.body //baca payload
    res.json(body)
})

app.listen(3000)