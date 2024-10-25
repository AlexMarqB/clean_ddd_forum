import { randomUUID } from "node:crypto";

interface QuestionProps {
	title: string;
	content: string;
	studentId: string;
}

export class Question {
	public id: string;
	public title: string;
	public content: string;
	public studentId: string;

	constructor(props: QuestionProps, id?: string) {
		this.title = props.title;
		this.content = props.content;
		this.studentId = props.studentId;
		this.id = id ?? randomUUID();
	}
}
