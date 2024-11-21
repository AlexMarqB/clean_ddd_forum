import { QuestionComment } from "../../enterprise/entities/question-comment";
import { CommentRepository } from "./interfaces/comment-repository";

export interface QuestionCommentsRepository extends CommentRepository<QuestionComment>{
    findManyByQuestionId(questionId: string): Promise<QuestionComment[]>
}