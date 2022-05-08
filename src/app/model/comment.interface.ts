export interface Comment {
    id:number;
    ownerName:string;
    ownerAvatarUrl: string;
    content:string;
    createdTime: string;
    commentReply : Comment[];
    like: number;
    updated: boolean;
    parentId:number;
  }