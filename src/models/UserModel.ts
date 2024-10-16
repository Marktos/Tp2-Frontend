export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    rememberMe?: boolean,
    isAdmin: boolean,
    jwtToken?: string,
    refreshTokens: string[]
}

export interface UserState {
    usuarios: User[]
}
