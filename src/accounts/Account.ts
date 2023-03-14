import { faker } from "@faker-js/faker";
import { Comment, CommentTypeEnum } from "../comments/comment.model";
import { UpdateCommentDto } from "../comments/comments.dto";
import { getRandomId } from "../utils";
import { users } from "../useLocalStorage";

export interface Account {
  id: number,
  name:string,
  profilePic: string,
  scoredComments: number[],

  createComment(comment: string): boolean;
  updateComment(commentId:Comment['id'], commentType: CommentTypeEnum, changes: UpdateCommentDto['comment'],userId:Account['id'], replyId?:Comment['id'], users?:Account[]): boolean;
  deleteComment(id: Comment['id']): boolean;
  replyToComment(users:Account[],comment: string, userId: Account['id'], commentId:Comment['id'] ): boolean;
  createReply(comment: string):Comment;
  scoreComment(comment: Comment['id']):boolean;
  getComments(): Comment[];
}

export class Account implements Account {
    private comments: Comment[];

     constructor(account: Account = {} as Account){
      this.id = account.id || getRandomId();
      this.name = account.name || faker.name.firstName();
      this.profilePic = account.profilePic || faker.image.avatar();
      this.comments = account.comments || [];
     }

     createComment(comment: string):boolean {
      const newComment = new Comment(
        {
          "id": this.id,
          "username": this.name,
         "image": this.profilePic,
      },
         comment,
         faker.datatype.number({
          'min': 1,
          'max': 20,
        }),
         CommentTypeEnum.comment,
      )
      this.comments.push(newComment);
      return true;
     }

     createReply(comment: string):Comment {
      const newComment = new Comment(
        {
          "id": this.id,
          "username": this.name,
         "image": this.profilePic},
         comment,
         faker.datatype.number({
          'min': 1,
          'max': 10,
        }),
         CommentTypeEnum.reply,
      )
      return newComment;
     }


     updateComment(commentId:Comment['id'], commentType: CommentTypeEnum, changes: UpdateCommentDto['comment'],userId?:Account['id'], replyId?:Comment['id']): boolean {
      if(commentType === CommentTypeEnum.comment){
        const index = this.comments.findIndex(el => el.id === commentId);
        const prevComment = this.comments[index];
        prevComment.comment = changes;
        return true;
      } else if (commentType === CommentTypeEnum.reply){
        const index = users.findIndex(el => el.id === userId);
        const commentIndex = users[index].comments.findIndex(el => el.id === commentId);
        const replyIndex = users[index].comments[commentIndex].replies.findIndex(el => el.id === replyId);
        const prevComment = users[index].comments[commentIndex].replies[replyIndex];
        prevComment.comment = changes;
        return true;
      }
     }

     deleteComment = (id: Comment['id']): boolean => {
      const filteredComments = this.comments.filter((el) => el.id !== id);
      this.comments = filteredComments;
      return true
    }

    deleteReply = (users: Account[], userId: Account['id'], commentId: Comment['id'], replyId: Comment['id']): boolean => {
      const userIndex = users.findIndex(el => el.id === userId);
      const commentIndex = users[userIndex].getComments().findIndex(el => el.id === commentId);
      const filteredComments = users[userIndex].getComments()[commentIndex].replies.filter((el) => el.id !== replyId);
      users[userIndex].comments[commentIndex].replies = filteredComments;
      return true;
    }

    replyToComment(users: Account[],comment: string, userId: Account['id'], commentId: Comment['id']): boolean {
        const userIndex = users.findIndex(el => el.id === userId);
        const commentIndex = users[userIndex].comments.findIndex(el => el.id === commentId);
        const reply = this.createReply(comment);
        users[userIndex].comments[commentIndex].replies.push(reply)
        return true
    }

    //TODO: Crear función para eliminar replies o modifcar la deleteComment fn para que acepte eliminación de replies tambien. If el.commentType = reply then hacer tal cosa.

    getComments(): Comment[] {
      return this.comments;
    }

}
