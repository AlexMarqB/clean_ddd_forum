import { Either, left, right } from "@/core/either"
import { QuestionsRepository } from "../../repositories/questions-repository"

interface UpdateQuestionRequest {
    questionId: string
    authorId: string
    title: string
    content: string
}

type UpdateQuestionResponse = Either<string, {}>

export class UpdateQuestion {
    constructor(private repository: QuestionsRepository) {}

    async execute({
        questionId,
        authorId,
        title,
        content
    }: UpdateQuestionRequest): Promise<UpdateQuestionResponse> {
        const question = await this.repository.findById(questionId)

        if (!question) {
            return left('Question not found')
        }

        if(authorId !== question.authorId.toString()) {
            return left('Not allowed')
        }

        question.title = title
        question.content = content

        await this.repository.save(question)

        return right({})
    }
}