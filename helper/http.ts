export type Method = "GET" | "POST" | "PUT" | "DELETE" | "OPTION";
export interface CookieOptions {
    domain?: string,
    maxAge?: string,
    encode?: string,
    expires?: Date,
    httpOnly?: boolean,
    secure?: boolean
    path?: string
}