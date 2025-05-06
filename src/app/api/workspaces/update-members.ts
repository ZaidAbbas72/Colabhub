import dbConnect from "@/lib/dbConnect";
import Member from "@/models/members";
import Workspace from "@/models/workspace";

export async function updateMemberWorkspaceNames() {
  try {
    await dbConnect();
    
    // Get all members
    const members = await Member.find({});
    
    for (const member of members) {
      // Find the corresponding workspace
      const workspace = await Workspace.findOne({ workspaceId: member.workspaceId });
      
      if (workspace) {
        // Update the member with workspace name
        await Member.updateOne(
          { _id: member._id },
          { $set: { workspaceName: workspace.name } }
        );
        console.log(`Updated member ${member._id} with workspace name: ${workspace.name}`);
      }
    }
    
    console.log("All member records updated successfully");
  } catch (error) {
    console.error("Error updating member records:", error);
  }
} 