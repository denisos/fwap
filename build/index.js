"use strict";
// more: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// and: https://eckertalex.dev/blog/typescript-fetch-wrapper
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// internal function to execute any appropriate fetch method
function fetchData(url, init) {
    return __awaiter(this, void 0, void 0, function* () {
        // call fetch with init options
        const response = yield fetch(url, Object.assign({}, init));
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
    });
}
function get(url, init) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetchData(url, Object.assign(Object.assign({}, init), { method: 'get' }));
    });
}
function del(url, init) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetchData(url, Object.assign(Object.assign({}, init), { method: 'delete' }));
    });
}
// T a generic type of request
// U generic type of response
function post(url, init) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetchData(url, Object.assign(Object.assign({}, init), { method: 'post' }));
    });
}
function put(url, init) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetchData(url, Object.assign(Object.assign({}, init), { method: 'put' }));
    });
}
function patch(url, init) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetchData(url, Object.assign(Object.assign({}, init), { method: 'patch' }));
    });
}
exports.default = {
    get,
    post,
    put,
    patch,
    del
};
