import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment";
import { CommentProps } from "@/domain/forum/enterprise/entities/comment";
import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment";
import { faker } from '@faker-js/faker'

export function makeComment(overrides: Partial<CommentProps> = {},
    targetType: 'ANSWER' | 'QUESTION',
    targetId?: UniqueEntityId,
    id?: UniqueEntityId,
) {
        if(targetType === 'ANSWER') {
            const props: AnswerCommentProps = {
                authorId: overrides.authorId ?? 'default-author-id',
                answerId: targetId ?? new UniqueEntityId('default-answer-id'),
                content: faker.lorem.text(),
                ...overrides,
            }
            return AnswerComment.create(props, id)
        }

        if(targetType === 'QUESTION') {
            const props: QuestionCommentProps= {
                authorId: overrides.authorId ?? 'default-author-id',
                questionId: targetId ?? new UniqueEntityId('default-question-id'),
                content: faker.lorem.text(),
                ...overrides,
            }
            return QuestionComment.create(props, id)
        }
}