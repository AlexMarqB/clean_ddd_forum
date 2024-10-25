import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";

interface QuestionProps {
	title: string;
    slug: Slug; // URL friendly title - possui regras de negócio próprias, restrições de caracteres, etc => Objeto de valor
	content: string;
	studentId: string;
}

export class Question extends Entity<QuestionProps> {

	
}
