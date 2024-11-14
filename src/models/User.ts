export default interface User {
    id: string
    username: string | null
    description: string | null
    balance: number
    created_at: string
}