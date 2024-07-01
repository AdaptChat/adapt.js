import { Guild } from "../structure/Guild";
import { ApiError, IGuild } from "../types";
import { CacheManager } from "./CacheManager";

export class GuildCollection extends CacheManager<IGuild> {

   /**
     * Get a channel from cache or fetch one if it isn't cached.
     * @param id The id of the channel.
     * @returns A channel or null if one is not found.
     * @throws Error is thrown if something goes wrong.
     */
   public async fetch(id: bigint) {
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
    const channel = new Guild(data);
    this.set(channel.id, channel);
    return channel;
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