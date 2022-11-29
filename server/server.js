const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const PORT = 4000

const {
    getUserInfo,
    createUserProfile,
    getProjects,
    createProject
} = require('./Handlers/handlers.js')
console.log(getUserInfo);


express()

    .use(express.json())
    .use(morgan('tiny'))
    .use(helmet())

    //get userInfo '/api/createUserProfile'
    .get('/api/userProfile/:userLoginId', getUserInfo)
    .get('/api/getProjects/:userId', getProjects)



    .post('/api/createProject', createProject)
    .post('/api/createUserProfile', createUserProfile)




    

    .listen(PORT, () => {
        console.log(`example app listening on port ${PORT}`)
    })