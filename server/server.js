const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const PORT = 4000

const {

    getUserInfo,
    createUserProfile,
    getProjects,
    createProject,
    deleteProject,
    updateProject,
    deleteUser,
    updateUser

} = require('./Handlers/handlers.js')

express()

    .use(express.json())
    .use(morgan('tiny'))
    .use(helmet())

    .get('/api/userProfile/:userLoginId', getUserInfo)
    .post('/api/createUserProfile', createUserProfile)
    .patch('/api/updateUser/:userId', updateUser)
    .delete('/api/deleteUser/:userId', deleteUser)

    .get('/api/getProjects/:userId', getProjects)

    .post('/api/createProject', createProject)
    .patch('/api/updateProject/:projectId', updateProject)
    .delete('/api/deleteProject/:projectId', deleteProject)


    .listen(PORT, () => {
        console.log(`example app listening on port ${PORT}`)
    })