import { QuestionComment } from "@/domain/forum/enterprise/entities/comment-objects/question-comment";
import { QuestionCommentsRepository } from "../../repositories/question-comments-repository";

interface ListQuestionCommentsResponse {
    comments: QuestionComment[]
}

export class ListQuestionComments { 
    constructor(private repository: QuestionCommentsRepository) {}

    async execute(questionId: string): Promise<ListQuestionCommentsResponse> {
        const comments = await this.repository.findManyByQuestionId(questionId)

        return {comments}
    }
}