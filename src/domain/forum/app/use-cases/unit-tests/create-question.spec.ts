import { Question } from '@/domain/forum/enterprise/entities/question'
import { CreateQuestionUseCase } from '../create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let repository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create question Use Case Unit Test', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(repository)
  })

  it('should be able to create an answer', async () => {
    const response = await sut.execute({
      authorId: 'any_id',
      title: 'any_title',
      content: 'any_content',
    })

    expect(response.question).toBeInstanceOf(Question)
    expect(response.question.content).toBe('any_content')
  })
})
