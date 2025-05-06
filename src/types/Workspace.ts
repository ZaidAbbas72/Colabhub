export interface Workspace {
  workspaceId: string;
  name: string;
  ownerId: string;
  joinCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}