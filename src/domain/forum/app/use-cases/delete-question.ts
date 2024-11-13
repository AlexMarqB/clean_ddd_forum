import { QuestionsRepository } from "../repositories/questions-repository"

interface DeleteQuestionRequest {
    authorId: string
    questionId: string
}

interface DeleteQuestionResponse {}

export class DeleteQuestion {
    constructor(private repository: QuestionsRepository) {}

    async execute({authorId, questionId}: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
        const question = await this.repository.findById(questionId)

        if (!question) {
            throw new Error('Question not found')
        }

        if(authorId !== question.authorId.toString()) {
            throw new Error('Not allowed')
        }

        await this.repository.delete(question)

        return {}
    }
}