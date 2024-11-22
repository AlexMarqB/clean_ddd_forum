import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswersRepository } from "../../repositories/answers-repository"
import { Either, right } from "@/core/either"


interface ListQuestionAnswersRequest {
    questionId: string
}

type ListQuestionAnswersResponse = Either<string, {
    answers: Answer[]
}>

export class ListQuestionAnswers {
    constructor(private repository: AnswersRepository) {}

    async execute({questionId}: ListQuestionAnswersRequest): Promise<ListQuestionAnswersResponse> {
        const answers = await this.repository.findManyByQuestionId(questionId)

        return right({answers})
    }
}