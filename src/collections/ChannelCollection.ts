import { Channel } from "../structure/Channel";
import { ApiError, IChannel, ChannelCreateOptions } from "../types";
import { CacheManager } from "./CacheManager";

export class ChannelCollection extends CacheManager<Channel> {

    /**
     * Get a channel from cache or fetch one if it isn't cached.
     * @param id The id of the channel.
     * @returns A channel or null if one is not found.
     * @throws Error is thrown if something goes wrong.
     */
    public async fetch(id: bigint) {
        const cached = this.get(id);
        if (cached) return cached;

        const res = await fetch(`${this.client.config.api}/channels/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${this.client.token}`
            }
        });

        const data = await res.json() as IChannel | ApiError;

        if (res.status == 404) return null;
        if (!res.ok) throw new Error(`${res.status} ${(data as ApiError).message}`);

        (data as IChannel).client = this.client;
        (data as IChannel).guild = await this.client.guilds.fetch((data as IChannel).guild_id!);
        const channel = new Channel(data as IChannel);
        this.set(channel.id, channel);
        return channel;
    }

    public async create(data: Partial<ChannelCreateOptions>) {
        const res = await fetch(
          `${this.client.config.api}/channels`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": this.client.token!,
            },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );
      
        const resData = (await res.json()) as ApiError | IChannel;
    
        if (!res.ok) {
          throw new Error("Failed to create room: " + (resData as ApiError).message);
        }
    
        (resData as IChannel).client = this.client;
        const channel = new Channel(resData as IChannel);
        this.set(channel.id, channel);
        return channel;
      }  
}