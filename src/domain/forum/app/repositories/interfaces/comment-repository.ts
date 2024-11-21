
export interface CommentRepository<T> {
    create(comment: T): Promise<void>
    findById(id: string): Promise<T | null>
    save(comment: T): Promise<void>
    delete(id: string): Promise<void>
}