import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { Either, right } from '@/core/either'



interface CreateQuestionUseCaseRequest {
    authorId: string
    title: string
    content: string
}

type CreateQuestionUseCaseResponse = Either<string, { question: Question }>

export class CreateQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,

  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
        authorId: new UniqueEntityId(authorId),
        title,
        content,
    })

    await this.repository.create(question)

    return right({question})
  }
}
