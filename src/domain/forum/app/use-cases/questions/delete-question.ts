import { Either, left, right } from "@/core/either"
import { QuestionsRepository } from "../../repositories/questions-repository"

interface DeleteQuestionRequest {
    authorId: string
    questionId: string
}

type DeleteQuestionResponse = Either<string, {}>

export class DeleteQuestion {
    constructor(private repository: QuestionsRepository) {}

    async execute({authorId, questionId}: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
        const question = await this.repository.findById(questionId)

        if (!question) {
            return left('Question not found')
        }

        if(authorId !== question.authorId.toString()) {
            return left('Not allowed')
        }

        await this.repository.delete(question)

        return right({})
    }
}