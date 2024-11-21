import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionCommentsRepository } from "@/domain/forum/app/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentRepository implements QuestionCommentsRepository {
    private items: QuestionComment[] = [];

    async create(comment: QuestionComment): Promise<void> {
        this.items.push(comment);
    }

    async findManyByQuestionId(questionId: string): Promise<QuestionComment[]> {
        return this.items.filter(item => item.questionId.toString() === questionId);
    }

    async findById(id: string): Promise<QuestionComment | null> {
        const comment = this.items.find(item => item.id.toString() === id);
        return comment || null;
    }

    async save(comment: QuestionComment): Promise<void> {
        const index = this.items.findIndex(item => item.id === comment.id);
        if (index !== -1) {
            this.items[index] = comment;
        } else {
            this.items.push(comment);
        }
    }

    async delete(id: string): Promise<void> {
        this.items = this.items.filter(item => item.id.toString() !== id);
    }
}