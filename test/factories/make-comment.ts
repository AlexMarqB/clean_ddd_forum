import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment";
import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment";
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
    overrides: Partial<AnswerComment> = {},
    id?: UniqueEntityId,
): AnswerComment {
    const props: AnswerCommentProps = {
        authorId: overrides.authorId ?? 'default-author-id',
        answerId: overrides.answerId ?? new UniqueEntityId('default-answer-id'),
        content: faker.lorem.text(),
        ...overrides,
    }
    return AnswerComment.create(props, id)
}

export function makeQuestionComment(
    overrides: Partial<QuestionComment> = {},
    id?: UniqueEntityId,
): QuestionComment {
    const props: QuestionCommentProps = {
        authorId: overrides.authorId ?? 'default-author-id',
        questionId: overrides.questionId ?? new UniqueEntityId('default-question-id'),
        content: faker.lorem.text(),
        ...overrides,
    }
    return QuestionComment.create(props, id)
}