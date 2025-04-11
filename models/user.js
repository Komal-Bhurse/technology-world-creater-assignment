import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
   },
   userType: {
      type: String,
      enum: ['SCP','Farmer'],
      required: false,
      default: "SCP"
   },
   addedBy:{
      type:String,
      required:false,
      default:null
   }, 
   status: {
      type: String,
      enum: ['New', 'Active', 'Inactive', 'Deleted'],
      required: false,
      default: "New"
   },
}, {
   timestamps: true,
   toJSON: {
      transform(doc, ret) {
         delete ret.password;
         delete ret.salt;
      },
   },
})

const User = mongoose.model('user', userSchema)

export default User;

