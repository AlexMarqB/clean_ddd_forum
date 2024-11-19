import { AnswersRepository } from "../../repositories/answers-repository"

interface UpdateAnswerRequest {
    answerId: string
    authorId: string
    content: string
}


export class UpdateAnswer {
    constructor(private repository: AnswersRepository) {}

    async execute({
        answerId,
        authorId,
        content
    }: UpdateAnswerRequest) {
        const answer = await this.repository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found')
        }

        if(authorId !== answer.authorId.toString()) {
            throw new Error('Not allowed')
        }

        answer.content = content

        await this.repository.save(answer)

        return {}
    }
}