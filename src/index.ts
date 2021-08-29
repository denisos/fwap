// more: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// and: https://eckertalex.dev/blog/typescript-fetch-wrapper

// internal function to execute any appropriate fetch method
async function fetchData<T>(url: string, init: RequestInit): Promise<T> {
  // call fetch with init options
  const response: Response = await fetch(url, { 
    ...init, 
  });

  // if not ok (4xx or 5xx) then throw js exception with http status code
  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  // return the body or empty object if parse fails
  return response.json()
    .catch((err) => {
      console.error("json() error", err);
      return {};
    });
}

async function get<T>(url: string, init?: RequestInit): Promise<T> {
  return await fetchData<T>(url, { ...init, method: 'get'});
}

async function del<T>(url: string, init?: RequestInit) {
  return await fetchData(url, { ...init, method: 'delete'});
}

// T generic, the type of request
// U generic the type of response
async function post<T, U>(url: string, init: RequestInit): Promise<U> {
  return await fetchData(url, { ...init, method: 'post'});
}

async function put<T, U>(url: string, init: RequestInit): Promise<U> {
  return await fetchData(url, { ...init, method: 'put'});
}

async function patch<T, U>(url: string, init: RequestInit): Promise<U> {
  return await fetchData(url, { ...init, method: 'patch'});
}

export default {
  get,
  post,
  put,
  patch,
  del
}
