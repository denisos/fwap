declare function get<T>(url: string, init?: RequestInit): Promise<T>;
declare function del<T>(url: string, init?: RequestInit): Promise<unknown>;
declare function post<T, U>(url: string, init: RequestInit): Promise<U>;
declare function put<T, U>(url: string, init: RequestInit): Promise<U>;
declare function patch<T, U>(url: string, init: RequestInit): Promise<U>;
declare const _default: {
    get: typeof get;
    post: typeof post;
    put: typeof put;
    patch: typeof patch;
    del: typeof del;
};
export default _default;
