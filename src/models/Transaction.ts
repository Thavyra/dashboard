export type Transaction = {
    is_transfer: false
    id: string
    application_id: string
    subject_id: string
    description: string | null
    amount: number
    created_at: string
}

export type Transfer = {
    is_transfer: true
    id: string
    application_id: string
    subject_id: string
    recipient_id: string
    description: string | null
    amount: number
    created_at: string
}