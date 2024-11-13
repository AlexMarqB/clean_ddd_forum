import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { faker } from '@faker-js/faker'

export function makeAnswer(overrides: Partial<AnswerProps> = {},
    id?: UniqueEntityId,
    questionId?: UniqueEntityId
): Answer {
    const answer = Answer.create({
        content: faker.lorem.text(),
        authorId: new UniqueEntityId(faker.lorem.word()),
        questionId: questionId ?? new UniqueEntityId(faker.lorem.word()),
        ...overrides
    }, id)

    return answer
} 