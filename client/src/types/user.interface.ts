
export interface UserLogin {
    email: string,
    password: string
}

export interface UserRegister extends UserLogin {
    username: string,
}

export interface DataUser extends UserRegister {
    _id: string,
    create_at: string,
    rol: string,
    update_at: string,
    access_token: string,
    token: string
    photo: string
    photo_id: DataFile
}

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

export interface CountAll {
    users_count: number,
    events_count: number
}
