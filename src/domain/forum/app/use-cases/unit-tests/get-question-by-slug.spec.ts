import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { GetQuestionBySlug } from '../get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

let repository: InMemoryQuestionsRepository
let sut: GetQuestionBySlug

describe('Get question by slug Use Case Unit Test', async () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlug(repository)
  })

  it('should be able to get an question by slug', async () => {
    const newQuestion = makeQuestion({
        slug: Slug.create('example-question')
    })

    await repository.create(newQuestion)

    const response = await sut.execute({
        slug: 'example-question',
    })

    expect(response.question).toBeInstanceOf(Question)
    expect(response.question.slug).toEqual(newQuestion.slug)
  })
})
