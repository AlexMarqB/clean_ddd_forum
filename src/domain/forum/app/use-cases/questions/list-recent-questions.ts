import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionsRepository } from "../../repositories/questions-repository"
import { Either, right } from "@/core/either"


interface ListRecentQuestionRequest {
    page: number,
    perPage?: number
}

type ListRecentQuestionResponse = Either<string, {
    questions: Question[]
}>


export class ListRecentQuestions {
    constructor(private repository: QuestionsRepository) {}

    async execute({page, perPage}: ListRecentQuestionRequest): Promise<ListRecentQuestionResponse> {
        const questions = await this.repository.findManyRecent({page, perPage: perPage ?? 10})

        return right({questions})
    }
}