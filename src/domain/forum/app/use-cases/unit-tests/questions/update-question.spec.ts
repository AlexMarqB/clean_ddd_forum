import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UpdateQuestion } from '../../questions/update-question'

let repository: InMemoryQuestionsRepository
let sut: UpdateQuestion

describe('Update question Use Case Unit Test', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new UpdateQuestion(repository)
  })

  it('should be able to update an question by id', async () => {
    const newQuestion = makeQuestion()

    await repository.create(newQuestion) 
    await sut.execute({
        authorId: newQuestion.authorId.toString(),
        questionId: newQuestion.id.toString(),
        title: 'new_title',
        content: 'new_content',
    })

    expect(repository.items[0]).toMatchObject({
        title: 'new_title',
        content: 'new_content'
    })
  })

  it("should not be able to update an question from another author", async () => {
    const newQuestion = makeQuestion()

    await repository.create(newQuestion) 

    await expect(sut.execute({
        authorId: 'another_id',
        questionId: newQuestion.id.toString(),
        title: 'new_title',
        content: 'new_content',
    })).rejects.toBeInstanceOf(Error)
  })
})
