interface ErrorResponse {
    title: string,
    status: number,
    errors: {
        name: string,
        reason: string
    }[]
}