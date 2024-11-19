import { AnswerCommentsRepository } from "@/domain/forum/app/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentRepository implements AnswerCommentsRepository {

    async create(comment: AnswerComment): Promise<void> {
        this.items.push(comment);
    }
    findManyByAnswerId(answerId: string): Promise<AnswerComment[]> {
        throw new Error("Method not implemented.");
    }
    private items: AnswerComment[] = [];

    async findById(id: string): Promise<AnswerComment | null> {
        const comment = this.items.find(item => item.id.toString() === id);
        return comment || null;
    }

    async save(comment: AnswerComment): Promise<void> {
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