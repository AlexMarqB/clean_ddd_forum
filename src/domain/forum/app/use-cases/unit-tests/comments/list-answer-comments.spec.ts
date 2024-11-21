import { describe, it, expect } from 'vitest'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ListAnswerComments } from '../../comments/list-answer-comments'
import { makeAnswerComment } from 'test/factories/make-comment'

let repository: InMemoryAnswerCommentRepository
let answersRepository: InMemoryAnswersRepository
let sut: ListAnswerComments

describe('ListAnswerComments', () => {
    beforeEach(() => {
        repository = new InMemoryAnswerCommentRepository()
        answersRepository = new InMemoryAnswersRepository()
        sut = new ListAnswerComments(repository)
    })

    it('should list all answer comment', async () => {
        await answersRepository.create(makeAnswer({},new UniqueEntityId('answer-1')))

        for(let i = 0; i < 3; i++) {
            await repository.create(makeAnswerComment({answerId: new UniqueEntityId('answer-1')}))
        }

        const response = await sut.execute('answer-1')

        expect(response.comments).toHaveLength(3)
        expect(response.comments[0]).toEqual(expect.objectContaining({
            answerId: new UniqueEntityId('answer-1')
        }))
    })
})