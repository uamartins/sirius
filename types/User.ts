import { Entity } from "./Entity"
import { Role, emptyRole } from "./Role"

export interface User extends Entity{
    name: string,
    email: string,
    admin: boolean,
    photo: string
    role: Role
}

export const emptyUser: User = {
    uuid: '',
    name: '',
    email: '',
    admin: false,
    photo: '',
    role: emptyRole
}
