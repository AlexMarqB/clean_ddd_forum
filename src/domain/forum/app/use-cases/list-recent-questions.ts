
import { Question } from "../../enterprise/entities/question"
import { QuestionsRepository } from "../repositories/questions-repository"

interface ListRecentQuestionRequest {
    page: number,
    perPage?: number
}

interface ListRecentQuestionResponse {
    questions: Question[]
}


export class ListRecentQuestions {
    constructor(private repository: QuestionsRepository) {}

    async execute({page, perPage}: ListRecentQuestionRequest): Promise<ListRecentQuestionResponse> {
        const questions = await this.repository.findManyRecent({page, perPage: perPage ?? 10})

        return {questions}
    }
}