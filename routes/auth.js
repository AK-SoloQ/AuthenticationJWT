//Exthernal Dependencies
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//Internal Dependencies
const User = require('../model/User')
const { registerValidation, registerLogin} = require('../validation/validation')
router.post('/register', async (req, res) => {
      const user = req.body
      
      try {
            // LETS VALIDATE THE DATA BEFORE WE A USER
            const validate = registerValidation(user)
            if (validate) {
                  res.status(400).send(validate)
            }
            // Checking if the user is already in the database
            const emailExist = await User.findOne({email: user.email})
            if(emailExist) {
                  return res.status(400).send('Email already exists')
            }
            // Hash passwords
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(user.password, salt)
            user.password = hashPassword
            //Create a new user
            const userModel = new User(user)
            const savedUser = await userModel.save()  
            res.send({user: savedUser._id})
      } catch (error) {
            res.status(400).send(` error  lors de la creation ${error}`)
      }
      

})

router.post('/login', async (req, res)  => {
      // LETS VALIDATE THE DATA BEFORE WE A USER
      const validate = registerLogin(req.body )
      if (validate) {
            return res.status(400).send(validate)
      }
      //Checking if the email exists
      const user = await User.findOne({email: req.body.email})
      if (!user) return res.status(400).send("Email doesn't exists" )
      //PASSWORD IS CORRECT
      const validPass = await bcrypt.compare(req.body.password, user.password)
      if (!validPass) return res.status(400).send("Invalid Password")
      // Create and assing a token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRIT)
      res.header('auth-token', token).send(token)
})

module.exports = router