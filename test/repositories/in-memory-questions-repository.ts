import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "@/domain/forum/app/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public items: Question[] = []

    async create(question: Question) {
        this.items.push(question)   
    }

    async save(question: Question) {
        const index = this.items.findIndex(item => item.id === question.id);

        if (index !== -1) {
            this.items[index] = question;
        }
    }

    async findBySlug(slug: string): Promise<Question | null> {
        return this.items.find(question => question.slug.value === slug) ?? null
    }

    async findById(id: string): Promise<Question | null> {
        return this.items.find(question => question.id.toString() === id) ?? null
    }

    async findManyRecent(params: { page: number; perPage: number }): Promise<Question[]> {
        return this.items
        .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice((params.page - 1) * params.perPage, params.page * params.perPage)
    }

    async delete(question: Question) {
        const index = this.items.findIndex(item => item.id === question.id);

        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
}