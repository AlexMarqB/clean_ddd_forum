import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface ListQuestionAnswersRequest {
    questionId: string
}

interface ListQuestionAnswersResponse {
    answers: Answer[]
}

export class ListQuestionAnswers {
    constructor(private repository: AnswersRepository) {}

    async execute({questionId}: ListQuestionAnswersRequest): Promise<ListQuestionAnswersResponse> {
        const answers = await this.repository.findManyByQuestionId(questionId)

        return {answers}
    }
}