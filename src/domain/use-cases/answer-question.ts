import { UniqueEntityId } from "../../core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestionUseCase {
    constructor(private repository: AnswersRepository) {}

    async execute({instructorId, questionId, content}: AnswerQuestionUseCaseRequest) {
        const answer = Answer.create({
            authorId: new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId),
            content: content
        })
        await this.repository.create(answer);

        return answer;
    }
}