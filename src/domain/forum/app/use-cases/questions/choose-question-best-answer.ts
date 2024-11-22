import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionsRepository } from "../../repositories/questions-repository"
import { AnswersRepository } from "../../repositories/answers-repository"
import { Either, left, right } from "@/core/either"


interface ChooseQuestionBestAnswerRequest {
    answerId: string
    authorId: string
}

type ChooseQuestionBestAnswerResponse = Either<string, {
    question: Question
}>

export class ChooseQuestionBestAnswer {
    constructor(private questionsRepository: QuestionsRepository, private asnwersRespository: AnswersRepository) {}

    async execute({
        answerId,
        authorId
    }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
        const answer = await this.asnwersRespository.findById(answerId)

        if (!answer) {
            return left('Answer not found')
        }
        
        const question = await this.questionsRepository.findById(answer.questionId.toString())
        
        if (!question) {
            return left('Question not found')
        }
        
        if(authorId !== answer.authorId.toString()) {
            return left('Not allowed')
        }

        question.bestAnswerId = answer.id

        await this.questionsRepository.save(question)

        return right({
            question
        })
    }
}