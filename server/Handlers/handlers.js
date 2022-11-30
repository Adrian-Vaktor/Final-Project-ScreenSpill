"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require('mongodb')

const options = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}
require('dotenv').config()
const { MONGO_URI } = process.env

const getUserInfo = async (req, res) => {
    const userId = req.params.userLoginId
    try{
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()

        const userQueryObj = { loginId: userId }

        const db = client.db('ScreenSpill')
        const result = await db.collection('Users').find(userQueryObj).toArray()
        
        client.close()
        
        res.status(200).json({
            status: 200,
            message: 'data',
            data: result[0]
        })

    }catch(err){

        console.log(err);
        
    }
}

const createUserProfile = async (req, res) => {
    const newUserItem = req.body
    newUserItem.userId = uuidv4()
    try{
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()

        const db = client.db('ScreenSpill')
        const result = await db.collection('Users').insertOne(newUserItem)
        console.log(result);
        
        client.close()
        
        res.status(200).json({
            status: 200,
            message: 'data',
            data: { 
                res: result,
                loginId: newUserItem.loginId
            }
        })

    }catch(err){
        console.log(err);
    }
}

const getProjects = async (req, res) => {
    const userId = req.params.userId
    try{
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()

        const userQueryObj = { userId: userId }

        const db = client.db('ScreenSpill')
        const result = await db.collection('Projects').find(userQueryObj).toArray()
        console.log(result);
        
        client.close()
        
        res.status(200).json({
            status: 200,
            message: 'data',
            data: result
        })

    }catch(err){
        console.log(err);
    }
} 

const createProject = async (req, res) => {
    const userId = req.params.userId
    const projectObj = req.body
    console.log(req.body);
    
    projectObj.projectId = uuidv4()

    try{
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()

        const db = client.db('ScreenSpill')
        const result_ofInsert = await db.collection('Projects').insertOne(projectObj)
        const result_ofUpdate = await db.collection('Users').updateOne(
            { loginId : projectObj.loginId },
            { $push:
                {
                    projects : projectObj.projectId
                }
            }
        )
        
        client.close()
        console.log(result_ofInsert, result_ofUpdate);
        
        res.status(200).json({
            status: 200,
            message: 'data',
            // data: result
        })

    }catch(err){

        console.log(err);
        
    }
} 



////!!!!!!!!!!!!
//// MAKE SURE THESE CHANGE THE USER OBJ AND THE PROJECT ITEM COLLECTIONS

const deleteProject = async (req, res) => {
    const projectId = req.params.projectId

    try{

        const client = new MongoClient(MONGO_URI, options)
        await client.connect()

        const db = client.db('ScreenSpill')
        const result = await db.collection('Projects').deleteOne()
        console.log(result);
        
        client.close()
        
        res.status(200).json({
            status: 200,
            message: 'project deleted',
            data: result[0]
        })

    }catch(err){
        console.log(err);
        
    }

}

const updateProject = async (req, res) => {
    const projectId = req.params.projectId

    try{
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()

        const db = client.db('ScreenSpill')
        const result = await db.collection('Projects').updateOne()
        console.log(result);
        
        client.close()
        
        res.status(200).json({
            status: 200,
            message: 'project updated',
            data: result[0]
        })

    }catch(err){
        console.log(err);
        
    }
}


const deleteUser = async (req, res) => {
    const userId = req.params.userId
    try{

        const client = new MongoClient(MONGO_URI, options)
        await client.connect()

        const db = client.db('ScreenSpill')
        const result = await db.collection('Users').deleteOne()
        console.log(result);
        
        client.close()
        
        res.status(200).json({
            status: 200,
            message: 'project deleted',
            data: result[0]
        })

    }catch(err){
        console.log(err);
        
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.userId

    try{
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()

        const db = client.db('ScreenSpill')
        const result = await db.collection('Users').updateOne()
        console.log(result);
        
        client.close()
        
        res.status(200).json({
            status: 200,
            message: 'project deleted',
            data: result[0]
        })

    }catch(err){
        console.log(err);
        
    }
}


//USERS
// each user object/item has stored inside the various information on the user.
// it holds refference to a project id that is then fetched from the projects collection 

// we need to enfore a datastructure so that projects arent confused and modified in side
//the ensted objects
//enforcing schemas


module.exports = {
    getUserInfo,
    createUserProfile,
    getProjects,
    createProject,
    deleteProject,
    updateProject,
    deleteUser,
    updateUser
};
