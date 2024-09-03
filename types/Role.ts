import { Entity } from "./Entity"

export interface Role extends Entity{
    name: string,
    type?: string,
    admin?: boolean
}

export const emptyRole: Role = {
    uuid: '',
    name: '',
    type: 'role.user',
    admin: false
}
