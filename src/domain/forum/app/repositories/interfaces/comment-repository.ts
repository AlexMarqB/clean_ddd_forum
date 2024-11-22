import { AnswerComment } from "@/domain/forum/enterprise/entities/comment-objects/answer-comment"
import { QuestionComment } from "@/domain/forum/enterprise/entities/comment-objects/question-comment"

type TComment = AnswerComment | QuestionComment

export interface CommentRepository<T> {
    create(comment: T): Promise<void>
    findById(id: string): Promise<T | null>
    save(comment: T): Promise<void>
    delete(comment: TComment): Promise<void>
}