import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"

interface AnswerProps {
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    content: string
    createdAt: Date
    updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
    static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId) {
        const answer = new Answer({ ...props, createdAt: new Date() }, id);
        return answer
    }

    get authorId() {
        return this.props.authorId
    }

    set authorId(value: UniqueEntityId) {
        this.props.authorId = value
    }

    get questionId() {
        return this.props.questionId
    }

    set questionId(value: UniqueEntityId) {
        this.props.questionId = value
    }

    get content() {
        return this.props.content
    }

    set content(value: string) {
        this.props.content = value
    }

    get createdAt() {
        return this.props.createdAt
    }

    set createdAt(value: Date) {
        this.props.createdAt = value
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    set updatedAt(value: Date | undefined) {
        this.props.updatedAt = value
    }
}