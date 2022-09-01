import { BaseModelInterface } from '../base.model';

export interface CommentInterface extends BaseModelInterface {
  comment: string,
  createAt: Date,
  score: number,
  replies: string[],
};
