// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotes";
// console.log("Server running");
// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }

// module.export = connectToMongo

const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/inotes";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;