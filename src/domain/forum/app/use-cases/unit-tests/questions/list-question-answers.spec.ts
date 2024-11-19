import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ListQuestionAnswers } from '../../questions/list-question-answers'

let repository: InMemoryAnswersRepository
let sut: ListQuestionAnswers

describe('List Question Answers Use Case Unit Test', () => {
    beforeEach(() => {
        repository = new InMemoryAnswersRepository()
        sut = new ListQuestionAnswers(repository)
    })

    it('should be able to list answers for a question', async () => {
        const questionId = new UniqueEntityId('question_id')
        const answer1 = makeAnswer({ questionId })
        const answer2 = makeAnswer({ questionId })

        await repository.create(answer1)
        await repository.create(answer2)

        const response = await sut.execute({ questionId: questionId.toString() })

        expect(response.answers).toHaveLength(2)
        expect(response.answers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: answer1.id }),
                expect.objectContaining({ id: answer2.id }),
            ])
        )
    })

    it('should return an empty list if no answers are found for the question', async () => {
        const questionId = 'non_existent_question_id'

        const response = await sut.execute({ questionId })

        expect(response.answers).toHaveLength(0)
    })
})