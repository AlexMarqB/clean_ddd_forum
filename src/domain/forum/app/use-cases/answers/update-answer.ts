import { Either, left, right } from "@/core/either"
import { AnswersRepository } from "../../repositories/answers-repository"

interface UpdateAnswerRequest {
    answerId: string
    authorId: string
    content: string
}

type UpdateAnswerResponse = Either<string, {}>

export class UpdateAnswer {
    constructor(private repository: AnswersRepository) {}

    async execute({
        answerId,
        authorId,
        content
    }: UpdateAnswerRequest): Promise<UpdateAnswerResponse> {
        const answer = await this.repository.findById(answerId)

        if (!answer) {
            return left('Answer not found')
        }

        if(authorId !== answer.authorId.toString()) {
            return left('Not allowed')
        }

        answer.content = content

        await this.repository.save(answer)

        return right({})
    }
}