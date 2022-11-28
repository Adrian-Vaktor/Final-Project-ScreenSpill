const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const PORT = 4000

const {
    getUserInfo
} = require('./Handlers/handlers.js')
console.log(getUserInfo);


express()

    .use(express.json())
    .use(morgan('tiny'))
    .use(helmet())

    //get userInfo 
    .get('/api/userProfile/:userLoginId', getUserInfo)
    .get('/api/hey', (req, res) => {
        res.send('hey')
    })


    // .post('/api/sssss', (req, res) => {
    //     res.json('Hello World!')
    // })

    

    .listen(PORT, () => {
        console.log(`example app listening on port ${PORT}`)
    })