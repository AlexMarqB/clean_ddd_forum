import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/comment-objects/question-comment'
import { QuestionCommentsRepository } from '../../repositories/question-comments-repository'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { Either, left, right } from '@/core/either'

interface QuestionCommentQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type QuestionCommentUseCaseResponse = Either<string, { questionComment: QuestionComment }>

export class QuestionCommentUseCase {
  constructor(private repository: QuestionCommentsRepository, private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    content,
  }: QuestionCommentQuestionUseCaseRequest): Promise<QuestionCommentUseCaseResponse> {
    const questionComment = QuestionComment.create({
      authorId,
      questionId: new UniqueEntityId(questionId),
      content
    })

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left('Question not found')
    }

    await this.repository.create(questionComment)

    return right({questionComment})
  }
}
