import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { CommentRepository } from "./interfaces/comment-repository";

export interface AnswerCommentsRepository extends CommentRepository<AnswerComment> {
    findManyByAnswerId(answerId: string): Promise<AnswerComment[]>
}