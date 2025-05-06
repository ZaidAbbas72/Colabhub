// models/Member.ts

import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    Emp_id: {
        type: String,
        required: true,
    },
    workspaceId: {
        type: String,
        required: true,
    },
    workspaceName: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["admin", "member"],
        required: true,
        default: "admin"
    }
}, {
    timestamps: true,
});

// Indexes
memberSchema.index({ workspaceId: 1 });
memberSchema.index({ workspaceId: 1, Emp_id: 1 }, { unique: true });
memberSchema.index({ Emp_id: 1 });

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);
export default Member;
