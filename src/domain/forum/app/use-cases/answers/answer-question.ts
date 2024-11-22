import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswersRepository } from "../../repositories/answers-repository";
import { Either, right } from "@/core/either";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

type AnswerQuestionUseCaseResponse = Either<string, { answer: Answer }>;

export class AnswerQuestionUseCase {
	constructor(private repository: AnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
			content,
		});
		await this.repository.create(answer);

		return right({ answer })
	}
}
