const { MongoClient } =require('mongodb');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

const db1 = async (data)=>{
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const coll = client.db('mydb').collection('signup');
    const olduser = await coll.findOne({Email:data.Email});
    if(olduser){
      return "user Already Exist"
    }
    const newPass = await bcrypt.hash(data.Password,4)
    data.Password = newPass;
    const cursor = await coll.insertOne(data);
    client.close();
    return "Message: Registartion Done";
  } catch (error) {
    return "Internal Server Error";
  }
}

const signindb = async (data)=>{
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const coll = client.db('mydb').collection('signup');
    const cursor = await coll.findOne({Email:data.Email});
    client.close();
    const isvalid = await bcrypt.compare(data.Password,cursor.Password,);
    if(isvalid){
      return "Login Ok"
    }
    else{
      return "Invalid Username or Password";
    }
    
  } catch (error) {
    console.log("Internal server error")
  }
}

module.exports = {db1,signindb};