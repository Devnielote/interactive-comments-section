import { BaseModelInterface } from '../base.model';

export interface Comment extends BaseModelInterface {
  id: number,
  comment: string,
  createdAt: Date,
  score: number,
  replies: Omit<Comment, 'replies'>[],
};
