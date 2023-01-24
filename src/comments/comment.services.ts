import { CreateCommentDto, UpdateCommentDto } from "./comments.dto";
import { Comment } from "./comment.model";
import { User } from "../users/user.model";
import { faker } from "@faker-js/faker";

export const existingComments: Comment[] = [];

export const currentUser: User = {
  image: faker.image.avatar(),
  username: 'You'
}

export const createComment = ( data: CreateCommentDto ) => {

  const newComment = {
    ...data
  }

  existingComments.push(newComment);

  return newComment;
}

export const updateComment = (id:Comment['id'], changes: UpdateCommentDto['comment']) => {
  const index = existingComments.findIndex(el => el.id === id);
  const prevComment = existingComments[index];
  prevComment.comment = changes;

  return existingComments[index];
}

export const reply = (id:Comment['id'], reply: Comment) => {

  const index = existingComments.findIndex(el => el.id === id);
  const replyingTo = existingComments[index];
  reply.replyingToUser = replyingTo.user.username;
  replyingTo.replies?.push(reply);
  return existingComments[index];
}

export const eraseComment = (id: Comment['id']) => {
  const index = existingComments.findIndex(el => el.id === id);
  if(index > -1){
    existingComments.splice(index, 1);
  }
  return existingComments;
}
