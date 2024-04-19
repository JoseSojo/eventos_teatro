export interface CreateFile {
    filename: string,
    description: string,
    use_in: string,
    size: number,
    type: string
}

export interface DataFile extends CreateFile {
    update_at: string,
    create_at: string,
    delete_at: string,
    _id: string
}
