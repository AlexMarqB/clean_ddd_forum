import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionsRepository } from "../../repositories/questions-repository"
import { Either, left, right } from "@/core/either"


interface GetQuestionBySlugRequest {
    slug: string
}

type GetQuestionBySlugResponse = Either<string, {
    question: Question
}>


export class GetQuestionBySlug {
    constructor(private repository: QuestionsRepository) {}

    async execute({slug}: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
        const question = await this.repository.findBySlug(slug)

        if (!question) {
            return left('Question not found')
        }

        return right({question})
    }
}