import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment";
import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment";
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
    overrides: Partial<AnswerComment> = {},
    answerId?: UniqueEntityId,
    id?: UniqueEntityId,
): AnswerComment {
    const props: AnswerCommentProps = {
        authorId: overrides.authorId ?? 'default-author-id',
        answerId: answerId ?? new UniqueEntityId('default-answer-id'),
        content: faker.lorem.text(),
        ...overrides,
    }
    return AnswerComment.create(props, id)
}

export function makeQuestionComment(
    overrides: Partial<QuestionComment> = {},
    questionId?: UniqueEntityId,
    id?: UniqueEntityId,
): QuestionComment {
    const props: QuestionCommentProps = {
        authorId: overrides.authorId ?? 'default-author-id',
        questionId: questionId ?? new UniqueEntityId('default-question-id'),
        content: faker.lorem.text(),
        ...overrides,
    }
    return QuestionComment.create(props, id)
}