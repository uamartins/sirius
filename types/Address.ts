export interface Address {
    street: string,
    complement: string,
    number: string,
    neighborhood: string,
    postCode: string
}

export const emptyAddress: Address = {
    street: '',
    complement: '',
    number: '',
    neighborhood: '',
    postCode: ''
}
