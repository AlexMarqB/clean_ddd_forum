import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { QuestionCommentsRepository } from "../../repositories/question-comments-repository";

export class DeleteComment {
    constructor(private repository: QuestionCommentsRepository | AnswerCommentsRepository) {}

    async execute(id: string): Promise<void> {
        const comment = await this.repository.findById(id)

        if (!comment) {
            throw new Error('Comment not found')
        }

        await this.repository.delete(id)
    }
}