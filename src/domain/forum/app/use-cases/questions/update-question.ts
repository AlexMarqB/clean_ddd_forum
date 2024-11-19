import { QuestionsRepository } from "../../repositories/questions-repository"

interface UpdateQuestionRequest {
    questionId: string
    authorId: string
    title: string
    content: string
}


export class UpdateQuestion {
    constructor(private repository: QuestionsRepository) {}

    async execute({
        questionId,
        authorId,
        title,
        content
    }: UpdateQuestionRequest) {
        const question = await this.repository.findById(questionId)

        if (!question) {
            throw new Error('Question not found')
        }

        if(authorId !== question.authorId.toString()) {
            throw new Error('Not allowed')
        }

        question.title = title
        question.content = content

        await this.repository.save(question)

        return {}
    }
}