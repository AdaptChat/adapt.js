import { Client } from "../client/Client";
import { Channel } from "../structure/Channel";
import { Guild } from "../structure/Guild";
import { Message } from "../structure/Message";
import { User } from "../structure/User";

/***
 * @typedef {Object} ClientConfig
 * @property {string} api
 * @property {string} cdn
 */
export interface ClientConfig {
  api: string;
  cdn: string;
  gateway: string;
  status: string;
}

/***
 * @typedef {Object} ClientOptions
 * @property {Partial<ClientConfig>} config
 */
export interface ClientOptions {
  config?: Partial<ClientConfig>;
}

/***
 * @typedef {"READY"} Events
 */
export type Events =
  | "hello"
  | "ready"
  | "pong"
  | "typing_start"
  | "typing_stop"
  | "message_create"
  | "message_update"
  | "message_delete";

export interface ErrorEvent extends ApiError {}

export interface ReadyEvent {
  user: IUser;
}

export interface TypingEvent {
  channel_id: string;
  user_id: string;
}

export interface EventMap {
  ready: ReadyEvent;
  typingStart: TypingEvent;
  typingStop: TypingEvent;
  messageCreate: Message;
  error: ErrorEvent;
}

/***
 * @typedef {Object} ApiError
 * @property {string} message
 */
export interface ApiError {
  message: string;
  code: number;
}

export interface IUser {
  client: Client;
  id: string;
  username: string;
  display_name: string;
  avatar: string | null;
  banner: string | null;
  bio: string | null;
  flags: number;
  email: string | null;
}

export interface GuildMemberCount {
  total: number;
  online: number | null;
}

export interface IGuild {
  client: Client;
  channels: Channel[];
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  banner: string | null;
  owner_id: string;
  flags: number;
  member_count: GuildMemberCount,
  vanity_url: string | null;
}

export interface ChannelCreateOptions {
  name: string;
  type: number;
  space_id?: string;
  parent_id?: string;
}

export interface IChannel {
  client: Client;
  guild: Guild | null;
  id: string;
  guild_id: string | null;
  type: string;
  topic: string | null;
  nsfw: boolean;
  locked: boolean;
  slowmode: number;
  last_message: IMessage | null;
  name: string;
  color: string | null;
  icon: string | null;
  position: number;
  overwrites: [];
  parent_id: string | null;
}

export interface MessageEmbedAuthor {
  icon_url?: string | null;
  name: string;
  url?: string | null;
}

export interface MessageEmbedField {
  align?: "left" | "center" | "right" | "inline";
  name: string;
  value: string;
}

export interface MessageEmbedFooter {
  icon_url?: string;
  text: string;
}

export interface MessageEmbed {
  author?: MessageEmbedAuthor;
  color?: number;
  description?: string;
  fields?: MessageEmbedField[];
  footer?: MessageEmbedFooter;
  hue?: number;
  image?: string;
  thumbnail?: string;
  timestamp?: string | Date;
  title?: string;
  type: "rich" | "image" | "video" | "meta";
  url?: string;
}

export interface MessageAttachment {
  alt: string;
  filename: string;
}

export interface IMessage {
  client: Client;
  channel: Channel;
  id: string;
  nonce: string | null;
  channel_id: string;
  author_id: string;
  author: User;
  type: string;
  content: string;
  embeds: MessageEmbed[];
  attachments: MessageAttachment[];
  flags: number;
  stars: number;
  mentions: [];
  edited_at: number | null;
  references: object[];
}

export interface CreateMessageOptions {
  content?: string;
  embeds?: MessageEmbed[];
  attachments?: MessageAttachment[];
  nonce?: string;
  references?: object[];
}