import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-questions-comments-repository"
import { QuestionCommentUseCase } from "../../comments/comment-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"

let repository: InMemoryQuestionCommentRepository
let questionsRepository: InMemoryQuestionsRepository
let sut: QuestionCommentUseCase

describe('QuestionCommentUseCase', () => {
    beforeEach(() => {
        repository = new InMemoryQuestionCommentRepository()
        questionsRepository = new InMemoryQuestionsRepository()
        sut = new QuestionCommentUseCase(repository, questionsRepository)
    })

  it('should create a new question comment', async () => {
    const question = makeQuestion()

    await questionsRepository.create(question)

    const response = await sut.execute({
        authorId: 'author-123',
        questionId: question.id.toString(),
        content: 'This is a comment'
      })

    expect(response.questionComment).toBeInstanceOf(QuestionComment)
    expect(response.questionComment.authorId.toString()).toBe('author-123')
  })

    it('should throw an error if the question does not exist', async () => {
        await expect(sut.execute({
            authorId: 'author-123',
            questionId: 'question-123',
            content: 'This is a comment'
            })).rejects.toThrow('Question not found')
    })
})