import { AnswersRepository } from "../repositories/answers-repository"
import { QuestionsRepository } from "../repositories/questions-repository"

interface DeleteAnswerRequest {
    authorId: string
    answerId: string
}

interface DeleteAnswerResponse {}

export class DeleteAnswer {
    constructor(private repository: AnswersRepository, private questionRepository: QuestionsRepository) {}

    async execute({authorId, answerId}: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
        const answer = await this.repository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found')
        }

        const question = await this.questionRepository.findById(answer.questionId.toString())

        if (!question) {
            throw new Error('Question owner of answer not found')
        }

        // Valida se quem está deletando a resposta é autor da resposta ou da pergunta
        if(authorId !== answer.authorId.toString() && authorId !== question.authorId.toString()) {
            throw new Error('Not allowed')
        }

        await this.repository.delete(answer)

        return {}
    }
}