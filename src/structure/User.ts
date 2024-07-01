import { Client } from "../client/Client";
import { IUser } from "../types";

/**
 * Represents a user on Adapt.
 */
export class User {
  /**
   * The client.
   */
  public client: Client;
  
  /**
   * The user's id.
   */
  public id: string;

  /**
   * The user's avatar.
   */
  public avatar: string | null;

  /**
   * The user's bio.
   */
  public bio: string | null;

  /**
   * The user's banner.
   */
  public banner: string | null;

  /**
   * The user's flags.
   */
  public flags: number;

  /**
   * The user's username.
   */
  public username: string;

  /**
   * The user's global name or username.
   */
  public displayName: string;

  /**
   * The user's email.
   */
  public email: string | null;

  /**
   * Creates a new instance of a User.
   * @param data The data for the user.
   * @param client The client.
   */
  constructor(data: IUser) {
    this.client = data.client;
    this.id = data.id;
    this.avatar = data.avatar;
    this.bio = data.bio;
    this.banner = data.banner;
    this.flags = data.flags;
    this.username = data.username ?? "Unkown User";
    this.displayName = data.display_name ?? data.display_name ?? this.username;
    this.email = null;
  }
}