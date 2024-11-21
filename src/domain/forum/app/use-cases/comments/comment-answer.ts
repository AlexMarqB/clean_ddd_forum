import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../../repositories/answer-comments-repository'
import { AnswersRepository } from '../../repositories/answers-repository'

interface AnswerCommentAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface AnswerCommentUseCaseResponse {
  answerComment: AnswerComment
}

export class AnswerCommentUseCase {
  constructor(private repository: AnswerCommentsRepository, private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: AnswerCommentAnswerUseCaseRequest): Promise<AnswerCommentUseCaseResponse> {
    const answerComment = AnswerComment.create({
      authorId,
      answerId: new UniqueEntityId(answerId),
      content
    })

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    await this.repository.create(answerComment)

    return {answerComment}
  }
}