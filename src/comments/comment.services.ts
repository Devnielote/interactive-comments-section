import { CreateCommentDto, ReplyCommentDto, UpdateCommentDto } from "./comments.dto";
import { Comment } from "./comment.model";

export const existingComments: Comment[] = [];

export const createComment = ( data: CreateCommentDto ): Comment => {
  const newComment = {
    ...data,
  }

  existingComments.push(newComment);

  return newComment;
}

export const updateComment = (id:Comment['id'], changes: UpdateCommentDto): Comment => {
  const index = existingComments.findIndex(el => el.id === id);

  const prevComment = existingComments[index];
  existingComments[index] = {
    ...prevComment,
    ...changes
  }

  return existingComments[index];
}

export const replyToComment = (id:Comment['id'], reply: ReplyCommentDto):Comment => {

  const index = existingComments.findIndex(el => el.id === id);

  const replyingTo = existingComments[index];

  replyingTo.replies.push(reply);

  return existingComments[index];
}

export const DeleteComment = (id: Comment['id']) => {
  const index = existingComments.findIndex(el => el.id === id);
  if(index > -1){
    existingComments.splice(index, 1);
  }
  return existingComments;
}
