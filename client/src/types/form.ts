export interface FormData {
    name: string,
    email: string,
    password?: string,
    confirmPassword?: string,
    role: string,
    skills?: string[] | string,
    seniority?: string,
    maxCapacity?: number | string,
    department?: string

}

export interface LoginData {
    email: string,
    password: string
}