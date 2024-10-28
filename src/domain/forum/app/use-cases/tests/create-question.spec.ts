
import { Question } from '@/domain/forum/enterprise/entities/question'

import { AnswerQuestionUseCase } from '../answer-question'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { CreateQuestionUseCase } from '../create-question'

/* eslint-disable @typescript-eslint/no-unused-vars */
const mockQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}
/* eslint-enable @typescript-eslint/no-unused-vars */

let repository: QuestionsRepository
let sut: CreateQuestionUseCase

describe('Answer Question Use Case Unit Test', async () => {
  beforeEach(async () => {
    repository = mockQuestionsRepository
    sut = new CreateQuestionUseCase(repository)
  })

  it('should create an answer', async () => {
    const response = await sut.execute({
      authorId: 'any_id',
      title: 'any_title',
      content: 'any_content',
    })

    expect(response.question).toBeInstanceOf(Question)
    expect(response.question.content).toBe('any_content')
  })
})
