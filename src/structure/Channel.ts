import { Client } from "../client/Client";
import { ApiError, IChannel, IMessage, CreateMessageOptions } from "../types";
import { Guild } from "./Guild";
import { Message } from "./Message";

/**
 * Represents a channel on Adapt.
 */
export class Channel {
  /**
   * The client.
   */
  public client: Client;

  /**
   * The guild the channels in if any.
   */
  public guild: Guild | null;

  /**
   * The channels's ID.
   */
  public readonly id: string;

  /**
   * The ID of the guild the channel's in, if any.
   */
  public readonly guildId: string | null;

  /**
   * The type of channel it is, ex: dm, text or voice.
   */
  public readonly type: string;

  /**
   * The topic of channel, if any.
   */
  public readonly topic: string | null;

  /**
   * Is the channel NSFW?
   */
  public readonly nsfw: boolean;

  /**
   * Is the channel locked?.
   */
  public readonly locked: boolean;

  /**
   * The channel's slowmode.
   */
  public readonly slowmode: number;

  /**
   * The last message in the channel.
   */
  public readonly lastMessage: IMessage | null;

  /**
   * The name of the channel.
   */
  public readonly name: string;

  /**
   * The color of the channel, if any.
   */
  public readonly color: string | null;

  /**
   * The channel's icon, if any.
   */
  public readonly icon: string | null;

  /**
   * The position of the channel.
   */
  public readonly position: number;

  /**
   * The permission overwrites for the channel.
   */
  public readonly overwrites: [];

  /**
   * The ID of the channel's category, if any.
   */
  public readonly parentId: string | null;

  /**
   * Creates a new instance of a channel.
   * @param data The data for the channel.
   * @param client The client.
   */
  constructor(data: IChannel) {
    this.client = data.client;
    this.guild = data.guild;
    this.id = data.id;
    this.guildId = data.guild_id;
    this.type = data.type;
    this.topic = data.topic;
    this.nsfw = data.nsfw;
    this.locked = data.locked;
    this.slowmode = data.slowmode;
    this.lastMessage = data.last_message;
    this.name = data.name;
    this.color = data.color;
    this.icon = data.icon;
    this.position = data.position;
    this.overwrites = data.overwrites;
    this.parentId = data.parent_id;
  }

  /**
   * Sends a message in a channel.
   * @param data The data to post for the message.
   * @param client The client.
   */

  public async send(data: CreateMessageOptions) {
    const res = await fetch(
      `${this.client.config.api}/channels/${this.id}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.client.token!,
        },
        body: JSON.stringify(data),
      }
    );

    const resData = (await res.json()) as ApiError | IMessage;

    if (!res.ok) {
      throw new Error(
        "Failed to send message: " + (resData as ApiError).message
      );
    }

    const message = new Message(resData as IMessage);

    return message;
  }
}