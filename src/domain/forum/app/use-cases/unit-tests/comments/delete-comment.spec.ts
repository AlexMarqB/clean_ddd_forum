import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answers-comments-repository"
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-questions-comments-repository"
import { DeleteComment } from "../../comments/delete-comment"
import { makeAnswerComment, makeQuestionComment } from "test/factories/make-comment"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { makeAnswer } from "test/factories/make-answer"


let repository: InMemoryQuestionCommentRepository | InMemoryAnswerCommentRepository
let auxRepository: InMemoryAnswersRepository | InMemoryQuestionsRepository
let sut: DeleteComment

describe("DeleteCommentUseCase", () => {
    it("should delete a question comment", async () => {
        repository = new InMemoryQuestionCommentRepository()
        auxRepository = new InMemoryQuestionsRepository()
        sut = new DeleteComment(repository)

        const question = makeQuestion({}, new UniqueEntityId('question-1'))

        await auxRepository.create(question)

        const comment = makeQuestionComment({questionId: question.id}, new UniqueEntityId('comment-1'))

        await repository.create(comment)

        await sut.execute(comment.id.toString())

        const foundComment = await repository.findById(comment.id.toString())

        expect(foundComment).toBeNull()
    })

    it("should delete an answer comment", async () => {
        repository = new InMemoryAnswerCommentRepository()
        auxRepository = new InMemoryAnswersRepository()
        sut = new DeleteComment(repository)

        const answer = makeAnswer({}, new UniqueEntityId('answer-1'))

        await auxRepository.create(answer)

        const comment = makeAnswerComment({answerId: answer.id}, new UniqueEntityId('comment-1'))

        await repository.create(comment)

        await sut.execute(comment.id.toString())

        const foundComment = await repository.findById(comment.id.toString())

        expect(foundComment).toBeNull()
    })
})