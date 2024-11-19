import { QuestionCommentsRepository } from "@/domain/forum/app/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentRepository implements QuestionCommentsRepository {

    async create(comment: QuestionComment): Promise<void> {
        this.items.push(comment);
    }
    findManyByQuestionId(questionId: string): Promise<QuestionComment[]> {
        throw new Error("Method not implemented.");
    }
    private items: QuestionComment[] = [];

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