import WebSocket from "isomorphic-ws";
import { encode, decode } from "@msgpack/msgpack";
import { OpCodes } from "../config";
import { Events, IChannel, IGuild, IMessage, IUser } from "../types";
import { Client } from "./Client";
import { ClientUser } from "../structure/ClientUser";
import { Message } from "../structure/Message";
import { Channel } from "../structure/Channel";
import { Guild } from "../structure/Guild";
import { User } from "../structure/User";

export interface WebsocketClient {
  connect(): Promise<void>;
  send({ data }: { data: any }): Promise<void>;
}

export function chooseClient(client: Client): WebsocketClient {
  if (typeof window !== "undefined") {
    return new WebsocketNodeClient(client);
    // return new WebsocketWorkerClient(client);
  } else {
    return new WebsocketNodeClient(client);
  }
}

/**
 * Represents a websocket client in node environments.
 */
export class WebsocketNodeClient implements WebsocketClient {
  private _ws: WebSocket | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  /**
   * Constructs a new WebsocketClient.
   * @param client The client associated with the websocket connection.
   */
  constructor(private client: Client) {}

  /**
   * Establishes a websocket connection to harmony.
   */
  public async connect() {
    this._ws = new WebSocket(this.client.config.gateway);

    this._ws!.addEventListener("open", () => {
      this.identify();
    });

    this._ws!.addEventListener("message", async (message: any) => {
      const { data, event } = decode(new Uint8Array(message.data), {useBigInt64: true}) as {
        data: any;
        event: Events;
      };

      switch (event) {
        case OpCodes.HELLO:
          this.startHeartbeat();
          break;
        case OpCodes.READY:
          this.client.user = new ClientUser({
            ...data.user,
            client: this.client,
          });
          data.guilds.forEach((guildData: any) => {
            guildData.client = this.client;
            guildData.channels.forEach((channelData: any) => {
              const channel = new Channel(channelData);
              channel.client = this.client;
              this.client.channels.set(channelData.id, channel);
            });
            const guild = new Guild(guildData);
            this.client.guilds.set(guildData.id, guild);
          });
          this.client.emit("ready", data);
          break;
        case OpCodes.MESSAGE_CREATE:
          let messageData = data.message;
          let channel = this.client.channels.get(messageData.channel_id);

          let messageAuthor = new User(messageData.author);
          messageData.channel = channel!;
          messageData.author = messageAuthor;

          const message = new Message(messageData);
          this.client.emit("messageCreate", message);
          break;
      }
    });

    this._ws.addEventListener("close", (event: any) => {
      this.client.emit("error", {
        code: 1006,
        message:
          "The websocket connection has been closed. Attempting to reconnect.",
      });
      if (event.code > 1000 && event.code != 4004) {
        setTimeout(() => {
          this.reconnect();
        }, 5000);
      }
    });
  }

  /**
   * Sends a message to Harmony.
   * @param data The data of the message.
   */
  public async send({ data }: { data: any }) {
    this._ws?.send(encode(data));
  }

  private identify() {
    const payload = {
      op: OpCodes.IDENTIFY,
      token: this.client.token,
      status: this.client.config.status,
      device: "desktop",
    };

    this._ws?.send(encode(payload));
  }

  private reconnect() {
    this.stopHeartbeat();
    this._ws = null;
    setTimeout(() => this.connect(), 5000);
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
    }, 15000);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
  }

  private sendHeartbeat() {
    this._ws?.send(encode({ op: OpCodes.PING }));
  }
}

/**
 * Recursively sanitize snowflakes in the object by converting BigInt to string.
 * @param json The object to sanitize.
 */
export function sanitizeSnowflakes(json: any): any {
  if (json == null) return json;

  if (typeof json === 'bigint') {
    return json.toString();
  }

  if (typeof json === 'object') {
    if (Array.isArray(json)) {
      return json.map(sanitizeSnowflakes);
    }

    for (const [key, value] of Object.entries(json)) {
      if (typeof value === 'number' && (key.endsWith('_id') || key === 'id')) {
        json[key] = BigInt(value).toString();
      } else if (key.endsWith('_id') && Array.isArray(value)) {
        json[key] = value.map((val: any) =>
          typeof val === 'number' ? BigInt(val).toString() : sanitizeSnowflakes(val)
        );
      } else {
        json[key] = sanitizeSnowflakes(value);
      }
    }
  }

  return json;
}