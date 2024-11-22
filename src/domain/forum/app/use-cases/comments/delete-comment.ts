import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { QuestionCommentsRepository } from "../../repositories/question-comments-repository";

interface DeleteCommentRequest {
    authorId: string
    commentId: string
}

type DeleteCommentResponse = Either<string, {}>

export class DeleteComment {
    constructor(private repository: QuestionCommentsRepository | AnswerCommentsRepository) {}

    async execute({authorId, commentId}: DeleteCommentRequest): Promise<DeleteCommentResponse> {
        const comment = await this.repository.findById(commentId)

        if (!comment) {
            return left('Comment not found')
        }

        if(comment.authorId.toString() !== authorId) {
            return left('Not authorized')
        }

        await this.repository.delete(comment)

        return right({})
    }
}