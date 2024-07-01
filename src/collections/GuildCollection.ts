import { Guild } from "../structure/Guild";
import { ApiError, IGuild } from "../types";
import { CacheManager } from "./CacheManager";

export class GuildCollection extends CacheManager<IGuild> {

   /**
     * Get a guild from cache or fetch one if it isn't cached.
     * @param id The id of the guild.
     * @returns A guild or null if one is not found.
     * @throws Error is thrown if something goes wrong.
     */
   public async fetch(id: string) {
    const cached = this.get(id);
    if (cached) return cached;

    const res = await fetch(`${this.client.config.api}/guilds/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${this.client.token}`
        }
    });

    const data = await res.json() as any | ApiError;

    if (res.status == 404) return null;
    if (!res.ok) throw new Error(`${res.status} ${(data as ApiError).message}`);

    data.client = this.client;
    const guild = new Guild(data);
    this.set(guild.id, guild);
    return guild;
}

    /**
     * Creates a new guild.
     * @param name The name of the guild.
     */
    public async create(name: string) {
        const res = await fetch(`${this.client.config.api}/guilds`, {
            method: "POST",
            headers: {
                "authorization": `${this.client.token}`,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                name,
            })
        });

        const data = await res.json() as any;
        if (!res.ok) throw new Error((data as ApiError).message);     
        return;
    }
}