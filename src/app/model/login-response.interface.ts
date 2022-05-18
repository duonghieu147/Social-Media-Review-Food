export interface LoginResponse {
    token: string;
    type: string;
    id: number,
    username: string,
    roles: String[]
}