const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  username:{
    type:String,
    unique:true
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String,
    required:true
  },

  roles: [{
    ref:"role",
    type: Mongoose.Types.ObjectId
  }],
  cart: {
    ref:"Cart",
    type: Mongoose.Types.ObjectId
  },
  telefono:{
    type: Number,
    default:0,
  }, },
  {
  timestamps:true,
  versionKey: false,
},
);

UserSchema.statics.encryptPassword = async (password) => {
  try {
    // I removed the callbackFn argument
    return await bcrypt.hash(password, 10)
 } catch (e) {
    console.log(e)
 }
}
UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password,receivedPassword)
}
module.exports = Mongoose.model('User', UserSchema);