import { describe, it, expect } from 'vitest'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-questions-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ListQuestionComments } from '../../comments/list-question-comments'
import { makeQuestionComment } from 'test/factories/make-comment'

let repository: InMemoryQuestionCommentRepository
let questionsRepository: InMemoryQuestionsRepository
let sut: ListQuestionComments

describe('ListQuestionComments', () => {
    beforeEach(() => {
        repository = new InMemoryQuestionCommentRepository()
        questionsRepository = new InMemoryQuestionsRepository()
        sut = new ListQuestionComments(repository)
    })

    it('should list all question comment', async () => {
        await questionsRepository.create(makeQuestion({},new UniqueEntityId('question-1')))

        for(let i = 0; i < 3; i++) {
            await repository.create(makeQuestionComment({questionId: new UniqueEntityId('question-1')}))
        }

        const response = await sut.execute('question-1')

        expect(response.comments).toHaveLength(3)
        expect(response.comments[0]).toEqual(expect.objectContaining({
            questionId: new UniqueEntityId('question-1')
        }))
    })
})