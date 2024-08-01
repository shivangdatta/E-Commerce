require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ProductModel = require('./models/Product')
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

//middleware
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser());


mongoose.connect(process.env.MONG_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Could not connect", err))


app.get('/',async(req, res) => {
  const products = await ProductModel.find()
  try {
    return res.status(201).json({'prod':products})
  }
  catch(err){
    console.log(err)
   }
})

app.get('*', checkUser);
app.get('/cart',requireAuth,(req,res)=>res.render('cart'))
app.use(authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port`,process.env.PORT)
}).on('error', (err) => {
  console.error("Failed to start server:", err)
})