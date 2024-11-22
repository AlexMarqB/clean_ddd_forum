import { Either, left, right } from "@/core/either"
import { AnswersRepository } from "../../repositories/answers-repository"
import { QuestionsRepository } from "../../repositories/questions-repository"

interface DeleteAnswerRequest {
    authorId: string
    answerId: string
}

type DeleteAnswerResponse = Either<string, {}>

export class DeleteAnswer {
    constructor(private repository: AnswersRepository, private questionRepository: QuestionsRepository) {}

    async execute({authorId, answerId}: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
        const answer = await this.repository.findById(answerId)

        if (!answer) {
            return left('Answer not found')
        }

        const question = await this.questionRepository.findById(answer.questionId.toString())

        if (!question) {
            return left('Question owner of answer not found')
        }

        // Valida se quem está deletando a resposta é autor da resposta ou da pergunta
        if(authorId !== answer.authorId.toString() && authorId !== question.authorId.toString()) {
            return left('Not allowed')
        }

        await this.repository.delete(answer)

        return right({})
    }
}