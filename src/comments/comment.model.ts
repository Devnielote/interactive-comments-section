import { User } from "../users/user.model";

export interface Comment {
  id: number,
  comment: string,
  createdAt: string,
  score: number,
  user:User,
  replies?:Comment[],
  replyingToUser?:string
};
