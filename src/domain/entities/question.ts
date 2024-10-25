import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";

interface QuestionProps {
	authorId: UniqueEntityId;
	bestAnswerId?: UniqueEntityId;
	title: string;
	slug: Slug; // URL friendly title - possui regras de negócio próprias, restrições de caracteres, etc => Objeto de valor
	content: string;
	createdAt: Date;
	updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
	static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityId) {
		const question = new Question({ ...props, createdAt: new Date() }, id);
		return question;
	}

	get authorId(): UniqueEntityId {
		return this.props.authorId;
	}

	get bestAnswerId(): UniqueEntityId | undefined {
		return this.props.bestAnswerId;
	}

	set bestAnswerId(value: UniqueEntityId | undefined) {
		this.props.bestAnswerId = value;
	}

	get title(): string {
		return this.props.title;
	}

	set title(value: string) {
		this.props.title = value;
	}

	get slug(): Slug {
		return this.props.slug;
	}

	set slug(value: Slug) {
		this.props.slug = value;
	}

	get content(): string {
		return this.props.content;
	}

	set content(value: string) {
		this.props.content = value;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt;
	}

	set updatedAt(value: Date | undefined) {
		this.props.updatedAt = value;
	}
}
