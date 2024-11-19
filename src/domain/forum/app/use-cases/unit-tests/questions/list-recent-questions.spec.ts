import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { ListRecentQuestions } from '../../questions/list-recent-questions'

let repository: InMemoryQuestionsRepository
let sut: ListRecentQuestions

describe('List Recent Questions Use Case Unit Test', () => {
    beforeEach(() => {
        repository = new InMemoryQuestionsRepository()
        sut = new ListRecentQuestions(repository)
    })

    it('should be able to list recent questions', async () => {
        const question1 = makeQuestion({ createdAt: new Date('2023-01-01') })
        const question2 = makeQuestion({ createdAt: new Date('2023-01-02') })

        await repository.create(question1)
        await repository.create(question2)

        const response = await sut.execute({ page: 1 })

        expect(response.questions).toHaveLength(2)
        expect(response.questions).toEqual(
            expect.arrayContaining([question1, question2])
        )
    })

    it('should return an empty list if there are no questions', async () => {
        const response = await sut.execute({ page: 1 })

        expect(response.questions).toHaveLength(0)
    })
})