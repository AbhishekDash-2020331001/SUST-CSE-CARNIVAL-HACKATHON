const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

dotenv.config({path:'./.env'})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(8000, () => {
        console.log("server is running")
    })
    console.log('database connected')
})
.catch(err=>{console.log(err)})




app.use('/auth', require('./routes/post_apis'))
app.use('/api',require('./routes/get_apis'))