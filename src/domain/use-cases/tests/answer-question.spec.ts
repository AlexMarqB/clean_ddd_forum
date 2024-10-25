import { AnswersRepository } from '@/domain/repositories/answers-repository';
import { AnswerQuestionUseCase } from '../answer-question'
import { Answer } from '@/domain/entities/answer';


const mockAnswersRepository: AnswersRepository = {
    create: async (answer: Answer) => {
        return;
    }
}


let repository: AnswersRepository;
let sut: AnswerQuestionUseCase;
describe("Answer Question Use Case Unit Test", async () => {
    beforeEach(async () => {
        repository = mockAnswersRepository;
        sut = new AnswerQuestionUseCase(repository);
    })

    it("should create an answer", async () => {
        const answer = await sut.execute({
            instructorId: "any_id",
            questionId: "any_id",
            content: "any_content"
        })

        expect(answer).toBeInstanceOf(Answer)
        expect(answer.content).toBe("any_content")
    })
})