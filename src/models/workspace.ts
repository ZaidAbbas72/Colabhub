import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";
const WorkspaceSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  workspaceId: { 
    type: String, 
    required: true,
    unique: true,
    default: () => nanoid(8)
  }
}, {
  timestamps: true
});

export default mongoose.models.Workspace || mongoose.model('Workspace', WorkspaceSchema);
