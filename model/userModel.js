const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'name is required'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['student', 'instructor'],
    required: true,
  },
  email: {
    type: String,
    required: [true,'email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true,'password is required'],
  },
}, { timestamps: true });

const userModel= mongoose.model('User', userSchema);

module.exports=userModel;
