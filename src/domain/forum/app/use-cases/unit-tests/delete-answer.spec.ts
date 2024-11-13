import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswer } from '../delete-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let repository: InMemoryAnswersRepository
let questionRepository: InMemoryQuestionsRepository
let sut: DeleteAnswer

describe('Delete answer Use Case Unit Test', async () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository()
    questionRepository = new InMemoryQuestionsRepository()
    sut = new DeleteAnswer(repository, questionRepository)
  })

  it('should be able to delete an answer by id with its own author id', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId('question_id'))

    await questionRepository.create(newQuestion)

    const newAnswer = Answer.create({
      authorId: new UniqueEntityId('author_id'),
      questionId: newQuestion.id,
      content: 'content',
    })

    await repository.create(newAnswer) 

    await sut.execute({
        authorId: newAnswer.authorId.toString(),
        answerId: newAnswer.id.toString(),
    })

    expect(repository.items).toHaveLength(0)
  })

  it('should be able to delete an answer by id with the questions author id', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId('question_id'))

    await questionRepository.create(newQuestion)

    const newAnswer = Answer.create({
      authorId: new UniqueEntityId('author_id'),
      questionId: newQuestion.id,
      content: 'content',
    })

    await repository.create(newAnswer) 

    await sut.execute({
        authorId: newQuestion.authorId.toString(),
        answerId: newAnswer.id.toString(),
    })

    expect(repository.items).toHaveLength(0)
  })

  it("should not be able to delete an answer from any author besides the question or answer author", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId('question_id'))

    await questionRepository.create(newQuestion)

    const newAnswer = Answer.create({
      authorId: new UniqueEntityId('author_id'),
      questionId: newQuestion.id,
      content: 'content',
    })

    await repository.create(newAnswer) 

    await sut.execute({
        authorId: newAnswer.authorId.toString(),
        answerId: newAnswer.id.toString(),
    })

    await expect(sut.execute({
        authorId: 'another_id',
        answerId: newAnswer.id.toString(),
    })).rejects.toBeInstanceOf(Error)
  })
})
