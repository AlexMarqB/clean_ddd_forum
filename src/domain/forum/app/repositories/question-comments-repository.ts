import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
    create(comment: QuestionComment): Promise<void>
    findById(id: string): Promise<QuestionComment | null>
    findManyByQuestionId(questionId: string): Promise<QuestionComment[]>
    save(comment: QuestionComment): Promise<void>
}