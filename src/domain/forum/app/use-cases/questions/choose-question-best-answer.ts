import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionsRepository } from "../../repositories/questions-repository"
import { AnswersRepository } from "../../repositories/answers-repository"


interface ChooseQuestionBestAnswerRequest {
    answerId: string
    authorId: string
}

interface ChooseQuestionBestAnswerResponse {
    question: Question
}

export class ChooseQuestionBestAnswer {
    constructor(private questionsRepository: QuestionsRepository, private asnwersRespository: AnswersRepository) {}

    async execute({
        answerId,
        authorId
    }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
        const answer = await this.asnwersRespository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found')
        }
        
        const question = await this.questionsRepository.findById(answer.questionId.toString())
        
        if (!question) {
            throw new Error('Question not found')
        }
        
        if(authorId !== answer.authorId.toString()) {
            throw new Error('Not allowed')
        }

        question.bestAnswerId = answer.id

        await this.questionsRepository.save(question)

        return {
            question
        }
    }
}