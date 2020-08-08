const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const parser = require('express-session')
const Users = require('./users/users-router')

const server = express()
const PORT = process.env.PORT || 4400;

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(parser())

server.use('/api/users', Users)
server.use((err, req, res, next) =>{
    res.status(500).json({
        message: "And in that moment she knew, she trucked up..."
    })
})

server.use('/', (req, res)=>{
    res.json({
        api: `🌴🌴🌴Never follow anyone else's path. Unless you're in the woods and you're lost and you see a path. Then by all means follow that path!🌴🌴🌴`  
    })
})

server.listen(PORT, () =>{
    console.log(`My server is running at http://localhost:${PORT} because I told it so.`)
})