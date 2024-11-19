import { describe, it, expect } from 'vitest'
import { AnswerCommentUseCase } from '@/domain/forum/app/use-cases/comments/comment-answer'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let repository: InMemoryAnswerCommentRepository
let answersRepository: InMemoryAnswersRepository
let sut: AnswerCommentUseCase

describe('AnswerCommentUseCase', () => {
    beforeEach(() => {
        repository = new InMemoryAnswerCommentRepository()
        answersRepository = new InMemoryAnswersRepository()
        sut = new AnswerCommentUseCase(repository, answersRepository)
    })

    it('should create a new answer comment', async () => {
        const answer = makeAnswer()

        await answersRepository.create(answer)

        const response = await sut.execute({
            answerId: answer.id.toString(),
            authorId: 'any_id',
            content: 'any_content',
        })

        expect(response.answerComment).toBeInstanceOf(AnswerComment)
        expect(response.answerComment.authorId.toString()).toBe('any_id')
    })

    it('should not be able to create a comment for a non-existing answer', async () => {
        await expect(sut.execute({
            answerId: 'non_existing_id',
            authorId: 'any_id',
            content: 'any_content',
        })).rejects.toBeInstanceOf(Error)
    })
})