// import { User } from '../users/user.model';
// import { User } from '../users/user.model';
import { Comment } from './comment.model';

export interface CreateCommentDto extends Comment {
}

export interface UpdateCommentDto extends Omit<Comment, 'createAt' | 'score' | 'replies' | 'user' | 'id' | 'replyingTo'> {
}

export interface DeleteCommentDto extends Omit<Comment, 'comment' | 'createAt' | 'score' | 'replies'> {
}
