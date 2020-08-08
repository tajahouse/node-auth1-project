const express = require('express')
const Users = require('../users/users-model')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const restrict = require('../middleware/restrict')

const router = express.Router()

router.get('/', async (req, res, next) =>{
    try{
        res.json( await Users.find())
    } catch (err) {
        next(err)
    }
})
module.exports = router;