import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";

interface ListAnswerCommentsResponse {
    comments: AnswerComment[]
}

export class ListAnswerComments { 
    constructor(private repository: AnswerCommentsRepository) {}

    async execute(answerId: string): Promise<ListAnswerCommentsResponse> {
        const comments = await this.repository.findManyByAnswerId(answerId)

        return {comments}
    }
}