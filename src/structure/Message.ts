import { Client } from "../client/Client";
import { IMessage, IUser, MessageAttachment, MessageEmbed } from "../types";
import { Channel } from "./Channel";

/**
 * Represents a message on Adapt.
 */
export class Message {
  /**
   * The client.
   */
  public client: Client;

  /**
   * The channel the message was sent in.
   */
  public channel: Channel;

  /**
   * The message's ID.
   */
  public readonly id: number;

  /**
   * The message's nonce if any.
   */
  public readonly nonce: string | null;

  /**
   * The message's channel ID.
   */
  public readonly channelId: number;

  /**
   * The ID of the message author.
   */
  public readonly authorId: number;

  /**
   * The ID of the message author.
   */
  public readonly author: IUser;

  /**
   * The type of message it is.
   */
  public readonly type: string;

  /**
   * The content of the message, if any.
   */
  public readonly content: string | null;

  /**
   * Embed in the message, if any.
   */
  public readonly embeds: MessageEmbed[];

  /**
   * Attachments in the message, if any.
   */
  public readonly attachments: MessageAttachment[];

  /**
   * Flags in the message.
   */
  public readonly flags: number;

  /**
   * Stars in the message.
   */
  public readonly stars: number;

  /**
   * Mentions in the message.
   */
  public readonly mentions: [];

  /**
   * When the message was last edited at.
   */
  public readonly editedAt: number | null;

  /**
   * References in the message, if any.
   */
  public readonly references: object[];

  /**
   * Creates a new instance of a message.
   * @param data The data for the message.
   * @param client The client.
   */
  constructor(data: IMessage) {
    this.client = data.client;
    this.channel = data.channel;
    this.id = data.id;
    this.nonce = data.nonce;
    this.channelId = data.channel_id;
    this.authorId = data.author_id;
    this.author = data.author;
    this.type = data.type;
    this.content = data.content;
    this.embeds = data.embeds;
    this.attachments = data.attachments;
    this.flags = data.flags;
    this.stars = data.stars;
    this.mentions = data.mentions;
    this.editedAt = data.edited_at;
    this.references = data.references;
  }
}