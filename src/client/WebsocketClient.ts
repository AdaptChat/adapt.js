import WebSocket from "isomorphic-ws";
import { OpCodes } from "../config";
import { Events, IChannel, IGuild, IMessage } from "../types";
import { Client } from "./Client";
import { ClientUser } from "../structure/ClientUser";
import { Message } from "../structure/Message";
import { Channel } from "../structure/Channel";
import { Guild } from "../structure/Guild";

export interface WebsocketClient {
  connect(): Promise<void>;
  send({ op, data }: { op: OpCodes; data: any }): Promise<void>;
}

export function chooseClient(client: Client): WebsocketClient {
  if (typeof window !== "undefined") {
    return new WebsocketNodeClient(client);
    // return new WebsocketWorkerClient(client);
  } else {
    return new WebsocketNodeClient(client);
  }
}

//  export class WebsocketWorkerClient implements WebsocketClient {
//     Worker client to be used in the future if wanted, better for web environments but node still works.
//  }

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
      const { data, event } = JSON.parse(message.data.toString()) as {
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
              const channel = new Channel(channelData)
              channel.client = this.client;
              this.client.channels.set(channelData.id, channel);
             })
             const guild = new Guild(guildData);
            this.client.guilds.set(guildData.id, guild);
          })
          this.client.emit("ready", data);
          break;
        case OpCodes.MESSAGE_CREATE:
          let messageData = data.message as IMessage;
          let channel = this.client.channels.get(messageData.channel_id);
          
          messageData.channel = channel!;

          const message = new Message(messageData as IMessage);
          this.client.emit("messageCreate", message)
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
   * @param op The opcode of the message.
   * @param data The data of the message.
   */
  public async send({ op, data }: { op: OpCodes; data: any }) {
    this._ws?.send(JSON.stringify({ op, data }));
  }

  private identify() {
    const payload = {
      op: OpCodes.IDENTIFY,
      token: this.client.token,
      status: "online",
      device: "desktop",
    };

    this._ws?.send(JSON.stringify(payload));
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
    this._ws?.send(JSON.stringify({ op: OpCodes.PING }));
  }
}