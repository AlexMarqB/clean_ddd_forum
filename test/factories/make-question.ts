import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { faker } from '@faker-js/faker'

export function makeQuestion(overrides: Partial<QuestionProps> = {},
    id?: UniqueEntityId
): Question {
    const question = Question.create({
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        authorId: new UniqueEntityId(faker.lorem.word()),
        ...overrides
    }, id)

    return question
} 