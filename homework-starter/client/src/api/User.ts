import {z} from 'zod';
import {validateResponse} from "./validateResponse.tsx";

export const UserSchema = z.object({
    id:z.string(),
    email: z.string(),
    username:z.string(),
})

export type User = z.infer<typeof UserSchema>

export function fetchUser(id:string):Promise<User> {
    return fetch(`api/users/${id}`).then((response) => response.json()).then(data => UserSchema.parse(data))
}

export function registerUser(data: {username: string, email: string, password: string}): Promise<void> {
    const {username, email, password} = data;
    return fetch("api/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, email, password})
        }).then(() => undefined);
}

export function login(data: {email: string, password: string}):Promise<void> {
    const{email, password} = data;
    return fetch("api/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        })
        .then(validateResponse)
        .then(()=> undefined)
}

export function logout(): Promise<void> {
    return fetch("/api/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    })
        .then(validateResponse)
        .then(() => undefined);
}

export function fetchMe(): Promise<User> {
    return fetch("api/users/me").then(validateResponse).then((response) => response.json()).then((data) =>UserSchema.parse(data))
}