import { Entity } from "@/core/entities/entity";

export interface CommentProps {
    authorId: string
    content: string
    createdAt: Date
    updatedAt?: Date
}

export abstract class Comment<Props extends CommentProps> extends Entity<Props> {
      private touch() {
        this.props.updatedAt = new Date()
      }
    
      get authorId() {
        return this.props.authorId
      }
    
      get content() {
        return this.props.content
      }
    
      set content(value: string) {
        this.props.content = value
        this.touch()
      }
    
      get createdAt() {
        return this.props.createdAt
      }
}