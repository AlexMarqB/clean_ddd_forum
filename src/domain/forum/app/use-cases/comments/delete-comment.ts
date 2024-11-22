import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { QuestionCommentsRepository } from "../../repositories/question-comments-repository";

interface DeleteCommentRequest {
    authorId: string
    commentId: string
}

export class DeleteComment {
    constructor(private repository: QuestionCommentsRepository | AnswerCommentsRepository) {}

    async execute({authorId, commentId}: DeleteCommentRequest): Promise<void> {
        const comment = await this.repository.findById(commentId)

        if (!comment) {
            throw new Error('Comment not found')
        }

        if(comment.authorId.toString() !== authorId) {
            throw new Error('You are not allowed to delete this comment')
        }

        await this.repository.delete(comment)
    }
}