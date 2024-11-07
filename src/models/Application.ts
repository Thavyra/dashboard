import Permission from "./Permission"

export default interface Application {
    id: string
    owner_id: string
    
    name: string
    description: string | null

    client_id?: string
    is_confidential?: boolean

    created_at: Date

    permissions?: Permission[]
}