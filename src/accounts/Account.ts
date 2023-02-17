import { faker } from "@faker-js/faker";
import { Comment } from "../comments/comment.model";
import { CreateCommentDto, UpdateCommentDto } from "../comments/comments.dto";
import { User } from "../users/user.model";
import { getRandomId } from "../utils";

export interface Account {
  id: number,
  name:string,
  profilePic: string,
  scoredComments: number[],

  createComment(data: CreateCommentDto): boolean;
  updateComment(id:Comment['id'], changes: UpdateCommentDto['comment']): boolean;
  deleteComment(id: Comment['id']): boolean;
  replyComment(comment: Comment, id: Comment['id']): boolean;
  scoreComment(comment: Comment['id']):boolean;
  getComments(): Comment[];
}

export class Account implements Account {
    private comments: Comment[];
     constructor(account: Account = {} as Account){
      this.id = account.id || getRandomId();
      this.name = account.name || faker.name.firstName();
      this.profilePic = faker.image.avatar();
      this.comments = account.comments || [];
     }

     createComment(data: Comment):boolean {
      const newComment = {
        ...data
      }

      this.comments.push(newComment);
      return true;
     }

     updateComment(id:Comment['id'], changes: UpdateCommentDto['comment']): boolean {
      const index = this.comments.findIndex(el => el.id === id);
      const prevComment = this.comments[index];
      console.log(prevComment);
      prevComment.comment = changes;
      return true;
     }

     deleteComment = (id: Comment['id']): boolean => {
      const index = this.comments.findIndex(el => el.id === id);
      if(index > -1){
        this.comments.slice(index, 1);
      }
      return true;
    }

    getComments(): Comment[] {
        return this.comments;
    }

}
