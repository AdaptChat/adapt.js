import { User } from "../structure/User";
import { ApiError, IUser } from "../types";
import { CacheManager } from "./CacheManager";

export class UserCollection extends CacheManager<User> {

    /**
     * Get a user from cache or fetch one if it isn't cached.
     * @param id The id of the user.
     * @returns A user or null if one is not found.
     * @throws Error is thrown if something goes wrong.
     */
    public async fetch(id: bigint) {
        const cached = this.get(id);
        if (cached) return cached;

        const res = await fetch(`${this.client.config.api}/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${this.client.token}`
            }
        });

        const data = await res.json() as IUser | ApiError;

        if (res.status == 404) return null;
        if (!res.ok) throw new Error(`${res.status} ${(data as ApiError).message}`);

        (data as IUser).client = this.client;
        const user = new User(data as IUser);
        this.set(user.id, user);
        return user;
    }
}