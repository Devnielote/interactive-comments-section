import { User } from "../users/user.model";
import { getRandomId } from "../utils";

export enum CommentTypeEnum {
  comment = 'Comment',
  reply = 'Reply',
};
export interface Comment{
  id: number | string,
  comment: string | null,
  commentType: CommentTypeEnum,
  createdAt: Date,
  score: number,
  user:User,
  replies:Comment[],
};


export class Comment implements Comment {
  public replies: Comment[] = [];
  constructor(
    public user: User,
    public comment: string | null,
    public score: number,
    public commentType: CommentTypeEnum,
    ){
      this.id = getRandomId();
      this.createdAt = new Date();
  }
}
