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

//USERS
// each user object/item has stored inside the various information on the user.
// it holds refference to a project id that is then fetched from the projects collection 

// we need to enfore a datastructure so that projects arent confused and modified in side
//the ensted objects
//enforcing schemas




module.exports = {
    getUserInfo,
};
