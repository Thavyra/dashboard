import { Session } from "next-auth";

type Body =
    | { type: "json", data: any }
    | { type: "form", data: FormData }

type FetchResult =
    | OkResult
    | FailedResult

type DataFetchResult<T> =
    | DataResult<T>
    | FailedResult

type OkResult = {
    status: SuccessStatus
    data?: any
}

type DataResult<T> = {
    status: SuccessStatus
    data: T
}

type SuccessStatus = 200 | 201 | 204

type FailedResult =
    | BadRequestResult
    | ForbiddenResult
    | NotFoundResult
    | ServerErrorResult
    | ExceptionResult

type BadRequestResult = {
    status: 400
    errors: ValidationError[]
}

type ForbiddenResult = {
    status: 403
    errors?: ValidationError[]
}

type NotFoundResult = {
    status: 404
}

type ServerErrorResult = {
    status: 500 | 503
}

type ExceptionResult = {
    status: "Exception"
}

type ValidationError = {
    name: string
    reason: string
}

export async function getBackend<T>(session: Session, path: string, init?: RequestInit): Promise<DataFetchResult<T>> {
    const response = await fetchBackend(session, path, undefined, { ...init, method: "GET" })

    if (response.status === 200) {
        return {
            status: response.status,
            data: response.data as T
        }
    }

    return response as FailedResult
}

export async function postBackend<T>(session: Session, path: string, body: any, init?: RequestInit): Promise<DataFetchResult<T>> {
    const response = await fetchBackend(session, path, body, { ...init, method: "POST" })

    if (response.status === 201) {
        return {
            status: response.status,
            data: response.data as T
        }
    }

    return response as FailedResult
}

export async function patchBackend<T>(session: Session, path: string, body?: any, init?: RequestInit): Promise<DataFetchResult<T>> {
    const response = await fetchBackend(session, path, body, { ...init, method: "PATCH" })

    if (response.status === 200) {
        return {
            status: response.status,
            data: response.data as T
        }
    }

    return response as FailedResult
}

export async function putBackend<T>(session: Session, path: string, body?: any, init?: RequestInit): Promise<DataFetchResult<T>> {
    const response = await fetchBackend(session, path, body, { ...init, method: "PUT" })

    if (response.status === 200) {
        return {
            status: response.status,
            data: response.data as T
        }
    }

    return response as FailedResult
}

export async function deleteBackend(session: Session, path: string, init?: RequestInit) {
    const response = await fetchBackend(session, path, undefined, { ...init, method: "DELETE" })

    return response
}

async function fetchBackend(session: Session, path: string, body?: any, init?: RequestInit): Promise<FetchResult> {
    let headers: HeadersInit = {
        ...init?.headers,
        "Authorization": `Bearer ${session.access_token}`
    }

    if (body && !(body instanceof FormData)) {
        headers = {
            ...headers,
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(process.env.THAVYRA_API_URL + path, {
        ...init,
        headers: headers,
        body: body instanceof FormData ? body
            : JSON.stringify(body)
    })

    try {

        const data = await response.json()

        return response.ok ? {
            status: response.status as SuccessStatus,
            data: data
        } : data

    } catch (error) {

        return {
            status: response.status
        } as FetchResult

    }
}