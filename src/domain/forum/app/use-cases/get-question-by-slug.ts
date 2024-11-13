import { Question } from "../../enterprise/entities/question"
import { QuestionsRepository } from "../repositories/questions-repository"

interface GetQuestionBySlugRequest {
    slug: string
}

interface GetQuestionBySlugResponse {
    question: Question
}


export class GetQuestionBySlug {
    constructor(private repository: QuestionsRepository) {}

    async execute({slug}: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
        const question = await this.repository.findBySlug(slug)

        if (!question) {
            throw new Error('Question not found')
        }

        return {question}
    }
}