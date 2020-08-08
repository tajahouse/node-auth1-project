const express = require('express')
const Users = require('../users/users-model')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const restrict = require('../middleware/restrict')

const router = express.Router()

router.get('/admin', restrict('admin'), async (req, res, next) =>{
    try{
        res.json( await Users.find())
    } catch (err) {
        next(err)
    }
})

router.get('/users', restrict('normal'), async (req, res, next) =>{
    try{
        res.json( await Users.findUsers())
    } catch (err) {
        next(err)
    }
})

router.post('/users', async(req, res, next) =>{
    try{
        const { username, password} = req.body
        const user = await Users.findBy({ username }).first()

        if(user){
            return res.status(409).json({
                message: 'Username already exists'
            })
        }

        const newUser = await Users.add({
            username, 
            password: await bcrypt.hash(password, 12)
        })

        res.status(201).json(newUser)
    } catch (err) {
        next (err)
    }
})
module.exports = router;