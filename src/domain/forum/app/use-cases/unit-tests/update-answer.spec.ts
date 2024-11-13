import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UpdateAnswer } from '../update-answer'

let repository: InMemoryAnswersRepository
let sut: UpdateAnswer

describe('Update answer Use Case Unit Test', async () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository()
    sut = new UpdateAnswer(repository)
  })

  it('should be able to update an answer by id', async () => {
    const newAnswer = makeAnswer()

    await repository.create(newAnswer) 
    await sut.execute({
        authorId: newAnswer.authorId.toString(),
        answerId: newAnswer.id.toString(),
        content: 'new_content',
    })

    expect(repository.items[0]).toMatchObject({
        content: 'new_content'
    })
  })

  it("should not be able to update an answer from another author", async () => {
    const newAnswer = makeAnswer()

    await repository.create(newAnswer) 

    await expect(sut.execute({
        authorId: 'another_id',
        answerId: newAnswer.id.toString(),
        content: 'new_content',
    })).rejects.toBeInstanceOf(Error)
  })
})
