const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const PORT = 4000

express()

    .use(express.json())
    .use(morgan('tiny'))
    .use(helmet())


    .get('/api/hello', (req, res) => {
        res.json('Hello World!')
    })


    .listen(PORT, () => {
        console.log(`example app listening on port ${PORT}`)
    })