import { User } from "../users/user.model";

export interface Comment {
  id: number | string,
  comment: string,
  createdAt: Date,
  score: number,
  user:User,
  replies?:Comment[],
  replyingToUser?:string
};
