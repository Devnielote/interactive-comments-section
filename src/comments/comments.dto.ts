// import { User } from '../users/user.model';
import { Comment } from './comment.model';

export interface CreateCommentDto extends Comment {
}

export interface ReplyCommentDto extends Comment{
}

export interface UpdateCommentDto extends Omit<Comment, 'createAt' | 'score' | 'replies'> {
}

export interface DeleteCommentDto extends Omit<Comment, 'comment' | 'createAt' | 'score' | 'replies'> {
}
