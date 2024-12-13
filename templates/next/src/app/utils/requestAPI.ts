export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: Record<string, unknown> | FormData | string;
}

async function requestAPI<ResponseType>(
  endpoint: string,
  method: HttpMethod = "GET",
  options: RequestOptions = {}
): Promise<{ data: ResponseType; response: Response }> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}${endpoint}`;

    // copy of options to avoid mutation
    const _options = { ...options };
    const isFormData = _options.body instanceof FormData;

    if (!isFormData && _options.body) {
      _options.body = JSON.stringify(_options.body);
      _options.headers = { "Content-Type": "application/json", ..._options.headers };
    }

    const requestOptions = {
      method,
      body: _options.body,
      headers: _options.headers,
      credentials: _options.credentials || "include",
      ..._options,
    };

    const response = await fetch(url, requestOptions as RequestInit);
    const data: ResponseType = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    return { data, response };
  } catch (error) {
    // if (error instanceof ApiError) {
    //   handleApiError(error);
    // }

    throw error;
  }
}

export default requestAPI;
