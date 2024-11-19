import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
    create(comment: AnswerComment): Promise<void>
    findById(id: string): Promise<AnswerComment | null>
    findManyByAnswerId(answerId: string): Promise<AnswerComment[]>
    save(comment: AnswerComment): Promise<void>
}