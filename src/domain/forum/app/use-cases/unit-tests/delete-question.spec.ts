import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestion } from '../delete-question'

let repository: InMemoryQuestionsRepository
let sut: DeleteQuestion

describe('Delete question Use Case Unit Test', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestion(repository)
  })

  it('should be able to delete an question by id', async () => {
    const newQuestion = makeQuestion()

    await repository.create(newQuestion) 
    await sut.execute({
        authorId: newQuestion.authorId.toString(),
        questionId: newQuestion.id.toString(),
    })

    expect(repository.items).toHaveLength(0)
  })

  it("should not be able to delete an question from another author", async () => {
    const newQuestion = makeQuestion()

    await repository.create(newQuestion) 

    await expect(sut.execute({
        authorId: 'another_id',
        questionId: newQuestion.id.toString(),
    })).rejects.toBeInstanceOf(Error)
  })
})
