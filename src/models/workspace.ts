import mongoose, { Schema } from "mongoose";

const WorkspaceSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  workspaceId: { 
    type: String, 
    required: true,
    unique: true,
  },
  ownerId: {
    type: String,
    required: true
  },
  joinCode: {
    type: String,
    required: true,
    unique: true,
    default: () => Math.floor(100000 + Math.random() * 900000).toString() // Generate 6-digit code
  }
}, {
  timestamps: true
});

const Workspace = mongoose.models.Workspace || mongoose.model('Workspace', WorkspaceSchema);
export default Workspace;
