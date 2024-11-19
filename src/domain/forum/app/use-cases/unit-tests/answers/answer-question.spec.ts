import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerQuestionUseCase } from '../../answers/answer-question'

let repository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
describe('Answer Question Use Case Unit Test', async () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(repository)
  })

  it('should create an answer', async () => {
    const response = await sut.execute({
      instructorId: 'any_id',
      questionId: 'any_id',
      content: 'any_content',
    })

    expect(response.answer).toBeInstanceOf(Answer)
    expect(response.answer.content).toBe('any_content')
  })
})
