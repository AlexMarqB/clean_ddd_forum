
import { AnswersRepository } from '../../repositories/answers-repository'
import { AnswerQuestionUseCase } from '../answer-question'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

/* eslint-disable @typescript-eslint/no-unused-vars */
const mockAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}
/* eslint-enable @typescript-eslint/no-unused-vars */

let repository: AnswersRepository
let sut: AnswerQuestionUseCase
describe('Answer Question Use Case Unit Test', async () => {
  beforeEach(async () => {
    repository = mockAnswersRepository
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
