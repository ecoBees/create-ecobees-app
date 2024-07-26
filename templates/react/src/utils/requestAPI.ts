export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

async function requestAPI<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  body: null | string | FormData = null,
  headers: Record<string, string> = {}
): Promise<T> {
  try {
    const url = `${import.meta.env.VITE_SERVER_URL}${endpoint}`;

    const isFormData = body instanceof FormData;

    const requestHeaders: HeadersInit = {
      ...headers,
    };

    if (body && !isFormData) {
      requestHeaders["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }

    const requestOptions: RequestInit = {
      method,
      body,
      headers: requestHeaders,
      credentials: "include",
    };

    const response = await fetch(url, requestOptions);

    const data: T = await response.json();

    if (!response.ok) {
      if (data instanceof Object) {
        // throw new ApiError(response.status, data);
      }
    }

    return data;
  } catch (error) {
    // if (error instanceof ApiError) {
    //   handleApiError(error);
    // }

    throw error;
  }
}

export default requestAPI;
