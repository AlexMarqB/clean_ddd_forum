import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeAnswer } from "test/factories/make-answer"
import { ChooseQuestionBestAnswer } from "../../questions/choose-question-best-answer"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswer

describe('Choose Question Best Answer Use Case Unit Test', async () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new ChooseQuestionBestAnswer(inMemoryQuestionsRepository, inMemoryAnswersRepository)
    })

    it('should be able to choose a question best answer', async () => {
        const question = makeQuestion({}, new UniqueEntityId('question_1'))

        await inMemoryQuestionsRepository.create(question)

        const answer = makeAnswer({questionId: question.id}, new UniqueEntityId('answer_1'))

        await inMemoryAnswersRepository.create(answer)

        const response = await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString()
        })

        expect(response.question.bestAnswerId).toBe(answer.id)
    })
})