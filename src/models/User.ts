// models/User.ts
import mongoose, { Schema, Document } from "mongoose";


const UserSchema: Schema = new Schema({
  First_name: {type: String, required: true },
  Last_name: {type: String, required: true,},
  Emp_id: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hashpassword: { type: String, required: true }, 
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
