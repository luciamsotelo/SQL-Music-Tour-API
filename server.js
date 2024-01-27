// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require ('sequelize')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// SEQUELIZE CONNECTION removed per instructions on lesson 3
// const sequelize = new Sequelize(process.env.PG_URI);
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connected with Sequelize');
//     })
//     .catch((err) => {
//         console.log(`Unable to connect to PG: ${err}`);
//     });

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})