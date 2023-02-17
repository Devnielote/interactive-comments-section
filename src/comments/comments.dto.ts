// import { User } from '../users/user.model';
// import { User } from '../users/user.model';
import { Comment } from './comment.model';

export interface CreateCommentDto extends Comment {
}

export interface UpdateCommentDto extends Omit<Comment, | 'score' | 'replies' | 'user' | 'id' | 'replyingTo'> {
  updateAt: Date;
}


