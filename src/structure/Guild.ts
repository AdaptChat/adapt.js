import { Client } from "../client/Client";
import { GuildMemberCount, IGuild } from "../types";
import { Channel } from "./Channel";

/**
 * Represents a guild on Adapt.
 */
export class Guild {
  /**
   * The client.
   */
  public client: Client;

  /**
   * The guild's channels.
   */
  public channels: Channel[];

  /**
   * The guild's id.
   */
  public readonly id: bigint;

  /**
   * The guild's name.
   */
  public readonly name: string;

  /**
   * The guild's description, if any.
   */
  public readonly description: string | null;

  /**
   * The guild's icon, if any.
   */
  public readonly icon: string | null;

  /**
   * The guild's banner, if any.
   */
  public readonly banner: string | null;

  /**
   * The ID of the guild's owner.
   */
  public readonly owner_id: bigint;

  /**
   * The guild's flags.
   */
  public readonly flags: number;

  /**
   * The guild's member count.
   */
  public readonly member_count: GuildMemberCount;

  /**
   * The vanity URL for the guild, if any.
   */
  public readonly vanity_url: string | null;

  /**
   * Creates a new instance of a guild.
   * @param data The data for the guild.
   * @param client The client.
   */
  constructor(data: IGuild) {
    this.client = data.client;
    this.channels = data.channels;
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.icon = data.icon;
    this.banner = data.banner;
    this.owner_id = data.owner_id;
    this.flags = data.flags;
    this.member_count = data.member_count;
    this.vanity_url = data.vanity_url;
  }
}