import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../../repositories/question-comments-repository'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface QuestionCommentQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface QuestionCommentUseCaseResponse {
  questionComment: QuestionComment
}

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
      throw new Error('Question not found')
    }

    await this.repository.create(questionComment)

    return {questionComment}
  }
}
