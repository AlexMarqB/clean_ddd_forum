import { AnswersRepository } from "@/domain/forum/app/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
    public items: Answer[] = []

    async create(answer: Answer) {
        this.items.push(answer)
    }

    async save(answer: Answer) {
        const index = this.items.findIndex(item => item.id === answer.id);

        if (index !== -1) {
            this.items[index] = answer;
        }
    }

    async findById(id: string): Promise<Answer | null> {
        return this.items.find(answer => answer.id.toString() === id) ?? null
    }

    async findManyByQuestionId(questionId: string): Promise<Answer[]> {
        return this.items.filter(answer => answer.questionId.toString() === questionId)
    }

    async delete(answer: Answer) {
        const index = this.items.findIndex(item => item.id === answer.id);

        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
}