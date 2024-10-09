export type Transaction = {
    id: string
    application_id: string
    subject_id: string
    recipient_id?: string
    description: string | null
    amount: number
    created_at: Date
}