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

router.post('/login', async(req, res, next) =>{
    try{
        const { username, password } = req.body
        const user = await Users.findBy({ username }).first()

        if(!user){
            return res.status(401).json({
                message: `Wrong username and password`
            })
        }

        const payload = {
            userId: user.id,
            username: user.username,
            userRole: 'normal'
        }

        res.cookie('token', jwt.sign(payload, process.env.JWT_SECRET))
        res.json({
            message: `You said the magic word ${user.username}!`
        })
    } catch (err){
        next(err)
    }
})

router.get("/logout", async (req, res, next)=>{
    try{
        req.session.destroy((err) =>{
           err ? next(err) : res.status(204).end()
        })
    } catch (err){
        next(err)
    }
})
module.exports = router;