const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()
const mongoURI = process.env.MONGO_URI

const connectToMongo = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify:false
  })
    .then(() => {
      console.log("connect sucess")
    })
    .catch(err => console.log(err))
  // mongoose.connect(mongoURI, () => {
  //     console.log('connect sucess')
  // })
}


module.exports = connectToMongo