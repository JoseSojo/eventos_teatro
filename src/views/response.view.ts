
interface CreateResponseErrorType { error: boolean, msg: string, body: any }

export const CreateResponseError = ({ error, msg, body }: CreateResponseErrorType) => {
    return { ok: false, error, msg, body };
}

interface CreateResponseErrorType { error: boolean, msg: string, body: any }

export const CreateResponseSuccess = ({ error, msg, body }: CreateResponseErrorType) => {
    return { ok: true, error, msg, body };
}
